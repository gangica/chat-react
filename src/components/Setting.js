import React, { useState, useEffect, useContext } from 'react';
import { downloadPhotos, getRoomMembers, leaveRoom, updateRoomPhoto, uploadPhotoToDb } from '../context/apicalls';
import { Redirect } from 'react-router-dom';
import '../css/Chat.css';
import { Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import { UserContext } from '../context/StateProvider';

const Setting = ({ roomId, roomName, roomPhoto }) => {
    const [{ user }] = useContext(UserContext)
    const [members, setMembers] = useState();
    const [redirect, setRedirect] = useState(false);
    const [photo, setPhoto] = useState();
    const [form, setForm] = useState(false);
    const [media, setMedia] = useState([]);

    const onFileChange = (e) => {
        let reader = new FileReader();
        let img = e.target.files[0]

        reader.onloadend = () => {
            setPhoto({
                file: img,
                previewUrl: reader.result
            })
        }

        reader.readAsDataURL(img);
    }

    const submitPhoto = async (e) => {
        e.preventDefault();
        if (photo) {
            await updateRoomPhoto(roomId, photo.file)
        }        
    }

    const getMedia = async () => {
        let media = await downloadPhotos(roomId);
        console.log(media)
        setMedia(media)
    }

    const leave = async () => {
        let res = await leaveRoom(roomId, user);
        if (res === true) {
            setRedirect(true)
        }
    }

    useEffect(() => {
        getRoomMembers(roomId, setMembers);
        getMedia();
    }, [roomId])

    return (!redirect ? (
        <div className="sidebar setting">
            <div className="setting__header">
                <InfoIcon />
                <h4>Room Info</h4>
            </div>
            <div className="profile__pic">
                <div className="photo__container">
                    {photo ? <Avatar src={photo.previewUrl} /> : <Avatar src={roomPhoto} />}
                    <label htmlFor="upload" className="description" id="upload__btn" onClick={() => setForm(!form)}>
                        <AddCircleIcon />
                    </label>
                </div>
                {form && <form className="upload__container" onSubmit={e => submitPhoto(e)}>
                    <input type="file" name="image" id="upload" onChange={onFileChange} />
                    <button className="btn"
                        type="submit">Upload Image</button>
                </form>}
                <h4 className="username">{roomName}</h4>
                <p>Room ID: {roomId}</p>
            </div>
            <div className="setting__section">
                <div className="conversation_header"><h4>Members</h4></div>
                {members && members.map(member => (
                <div key={member.id} className="members__info">
                    <Avatar src={member.data.photoURL} alt="avatar" />
                    <h4>{member.data.name}</h4>
                </div>))}
            </div>
            <div className="setting__section">
                <h4>Media</h4>
                <div className="grid">{media && media.map((url, i) => <img src={url} />)}</div>
            </div>
            <button className="send" onClick={leave}>Leave</button>
        </div>
    ) : (<Redirect to='/start' />))
}

export default Setting;