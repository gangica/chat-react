import db, { storage } from '../context/firebase';
import firebase from 'firebase';

// Get user
export const getUser = async (uid) => {
    return db.collection('users').doc(uid).get()
        .then(doc => doc.data())
        .catch(error => console.log(error))
}

// Get messages from room
export const getRoomMessages = (room, fn) => {
    db.collection('rooms')
        .doc(room).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot =>
            fn(snapshot.docs.map(doc => doc.data()))
        )
}

export const getLatestMessage = (room, fn) => {
    db.collection('rooms')
        .doc(room).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            let m = snapshot.docs.map(doc => doc.data());
            fn(m[m.length - 1])
        })
}

// Post messages
export const postMessages = (message, type, room, user) => {
    if (message) {
        db.collection('rooms').doc(room)
            .collection('messages').add({
                message: message,
                type: type,
                name: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
    }
}

// Get users' rooms
export const getUserRoomIds = (uid, fn) => {
    db.collection('users').doc(uid)
    .onSnapshot(snapshot => fn(snapshot.data().rooms));
}

export const getUserRooms = (roomIds, fn) => {
    let temp = [];
    roomIds.forEach(r => {
        temp.push(new Promise(resolve => {
            getRoomById(r, resolve)
        }, reject => {
            reject("Error retrieved")
        }))
    })

    Promise.all(temp)
        .then(res => fn(res))
        .catch(err => console.log(err))
}

// Get a room info
export const getRoomById = (room, fn) => {
    db.collection('rooms')
        .doc(room)
        .onSnapshot(snapshot => fn({
            id: snapshot.id,
            data: snapshot.data()
        }));
}

// Get a room's members
export const getRoomMembers = (room, fn) => {
    db.collection('rooms').doc(room).collection('members')
        .onSnapshot(snapshot => fn(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
}

// Join a room
export const joinRoom = async (roomId, user) => {
    return db.collection('rooms').doc(roomId).collection('members').add({
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL
    })
    .then(() => {
        return db.collection('users').doc(user.uid).update({
            rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
        })
    })
    .catch(error => console.log(error))
}

export const isAbleToJoin = async (roomId, user) => {
    let res = true;

    return db.collection('rooms').doc(roomId).get().then(doc => {
        // check if room id is valid
        if (!doc.exists) {
            res = "not exist"
        }
        return db.collection('users').where('rooms', 'array-contains', roomId).get()
    })
    .then(docs => {
        // check if user is already in room
        docs.forEach(doc => {
            if (doc.id === user.uid) {
                res = "already"
            }
        })
        return res
    })
}

// Create room
export const createRoom = async (roomName, user) => {
    return db.collection('rooms').add({
        name: roomName,
        admin: {
            name: user.displayName,
            uid: user.uid
        }
    })
    .then(async (room) => {
        await joinRoom(room.id, user)
        return room.id
    })
    .catch(error => console.log('no'));
}

// Leave room
export const leaveRoom = async (roomId, user) => {
    return db.collection('rooms').doc(roomId)
    .collection('members').where('uid', '==', user.uid).get()
    .then(docs => {
        docs.forEach(doc => doc.ref.delete())
        return db.collection('users').doc(user.uid).update({
            rooms: firebase.firestore.FieldValue.arrayRemove(roomId)
        })
    })
    .then(() => true)
    .catch(error => console.log('no'));
}

// Upload photo
export const uploadPhotoToDb = async (roomId, photoFile) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${roomId}/${photoFile.name}`);
    await fileRef.put(photoFile)

    let photoUrl = await fileRef.getDownloadURL();

    return photoUrl
}

export const updateRoomPhoto = async (roomId, photoFile) => {
    let photoUrl = await uploadPhotoToDb(roomId, photoFile);

    db.collection('rooms').doc(roomId).update({
        photo: photoUrl
    })
}

export const downloadPhotos = async (roomId) => {
    let listRef = storage.ref().child(`${roomId}`);
    let res = await listRef.list({ maxResults: 10 });

    let photos = [];
    res.items.forEach(item => {
        photos.push(new Promise(resolve => {
            let data = item.getDownloadURL()
            resolve(data)
        }, reject => {
            reject(new Error('not found'))
        }))
    })

    return Promise.all(photos)
}