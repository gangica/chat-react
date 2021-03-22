import db, { storage } from '../context/firebase';
import firebase from 'firebase';

/* USER HANDLING */
// Get user
export const getUser = async (uid) => {
    let res = await db.collection('users').doc(uid).get();
    return res.data()
}

/* ROOM INFO HANDLING */
// Get a room by ID
export const getRoomInfo = (room, setState) => {
    db.collection('rooms')
        .doc(room)
        .onSnapshot(snapshot => setState({
            id: snapshot.id,
            data: snapshot.data()
        }));
}

// Get user's rooms
export const getUserRooms = (uid, setState) => {
    db.collection('users').doc(uid)
        .onSnapshot(snapshot => {
            let roomIds = snapshot.data().rooms;
            let rooms = [];
            roomIds.forEach(r => {
                rooms.push(new Promise(resolve => {
                    getRoomInfo(r, resolve)
                }, reject => {
                    reject("Error retrieved")
                }))
            })

            Promise.all(rooms)
                .then(res => setState(res))
                .catch(err => console.log(err))
        });
}

/* ROOM ACTION HANDLING */
// Join room
export const joinRoom = async (roomId, user) => {
    await db.collection('rooms').doc(roomId).collection('members').add({
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL
    })
    
    await db.collection('users').doc(user.uid).update({
        rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
    })
}

// Join validator
export const isRoomIdValid = async (roomId) => {
    let res = await db.collection('rooms').doc(roomId).get()
    return res.exists ? true : false
}

export const isUserInRoom = async (roomId, user) => {
    let userInRoom = false;
    let res = await db.collection('users').where('rooms', 'array-contains', roomId).get();
    res.forEach(doc => {
        if (doc.id === user.uid) {
            userInRoom = true
        }    
    })
    return userInRoom
}

export const isAbleToJoin = async (roomId, user) => {
    let roomIdValid = await isRoomIdValid(roomId);
    let userInRoom = await isUserInRoom(roomId, user);

    if (roomIdValid) {
        if (!userInRoom) {
            return true
        } else {
            return "You're already in this room"
        }
    } else {
        return "Room does not exist"
    }
}

// Create Room
export const createRoom = async (roomName, user) => {
    let room = await db.collection('rooms').add({
        name: roomName,
        photo: null,
        admin: {
            name: user.displayName,
            uid: user.uid
        }
    })

    await joinRoom(room.id, user)
    return room.id
}

// Leave Room
export const leaveRoom = async (roomId, user) => {
    let res = await db.collection('rooms').doc(roomId).collection('members').where('uid', '==', user.uid).get();
    res.forEach(doc => doc.ref.delete())

    await db.collection('users').doc(user.uid).update({
        rooms: firebase.firestore.FieldValue.arrayRemove(roomId)
    })
}

/* PHOTO HANDLING */
// Upload photo to Cloud
export const uploadPhotoToDb = async (roomId, photoFile) => {
    const fileRef = storage.ref().child(`${roomId}/${photoFile.name}`);
    await fileRef.put(photoFile)

    let photoUrl = await fileRef.getDownloadURL();

    return photoUrl
}

// Update room photo
export const updateRoomPhoto = async (roomId, photoFile) => {
    let photoUrl = await uploadPhotoToDb(roomId, photoFile);

    db.collection('rooms').doc(roomId).update({
        photo: photoUrl
    })
}

// Download room media
export const downloadPhotos = async (roomId) => {
    let listRef = storage.ref().child(`${roomId}`);
    let res = await listRef.list({ maxResults: 9 });

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

// MEMBER HANDLING
// Get members of a room
export const getRoomMembers = (room, setState) => {
    db.collection('rooms').doc(room).collection('members')
        .onSnapshot(snapshot => setState(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
}

// MESSAGE HANDLING
// Get messages of a room
export const getRoomMessages = (room, setState) => {
    db.collection('rooms')
        .doc(room).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => 
            setState(snapshot.docs.map(doc => doc.data()))
        )
}

export const getLatestMessage = (room, setState) => {
    db.collection('rooms')
        .doc(room).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            let m = snapshot.docs.map(doc => doc.data());
            setState(m[m.length - 1])
        })
}

// Post messages
export const postMessages = (message, type, room, user) => {
    db.collection('rooms').doc(room)
        .collection('messages').add({
            content: message,
            type: type,
            author: {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
}