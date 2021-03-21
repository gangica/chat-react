import React, { useState, useEffect, useContext } from 'react';
import { downloadPhotos, getRoomMembers, leaveRoom, updateRoomPhoto, uploadPhotoToDb } from '../context/apicalls';
import { Redirect } from 'react-router-dom';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import { UserContext } from '../context/StateProvider';
import RoomDetail from './RoomDetail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Setting = () => {
    const [{ user, currentRoom }] = useContext(UserContext);
    const { id: roomId, name: roomName, photo: roomPhoto } = currentRoom;

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
            await updateRoomPhoto(roomId, photo.file);
        }        
    }

    const getMedia = async () => {
        let media = await downloadPhotos(roomId);
        setMedia(media)
    }

    const leave = async () => {
        setRedirect(true)
        await leaveRoom(roomId, user);
    }

    useEffect(() => {
        // getRoomMembers(roomId, setMembers);
        // getMedia();
    }, [roomId])

    return (!redirect ? (
        <div className="sidebar setting">
            <div className="setting__header">
                <InfoIcon />
                <h4>Room Info</h4>
                <IconButton onClick={leave}>
                    <ExitToAppIcon />
                </IconButton>
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
            {(members && media) && <RoomDetail members={members} media={media} />}
            {/* <button className="btn" onClick={leave}>Leave</button> */}
        </div>
    ) : (<Redirect to='/start' />))
}

export default Setting;