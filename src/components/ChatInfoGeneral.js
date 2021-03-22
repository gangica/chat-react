import React, { useState } from 'react';
import { updateRoomPhoto } from '../context/apicalls';
import '../css/Chat.css';
import { Avatar } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ChatInfoGeneral = ({ room }) => {
    const roomId = room.id;
    const { name: roomName, photo: roomPhoto } = room.data;
    const [photo, setPhoto] = useState();
    const [form, setForm] = useState(false);

    const onFileChange = (e) => {
        if (e.target.files[0]) {
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
    }

    const submitPhoto = async (e) => {
        e.preventDefault();
        if (photo) {
            await updateRoomPhoto(roomId, photo.file);
        }        
    }

    return (
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
    )
}

export default ChatInfoGeneral;