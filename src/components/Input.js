import React, { useState, useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import { postMessages, uploadPhotoToDb } from '../context/apicalls';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ImageIcon from '@material-ui/icons/Image';
import '../css/Chat.css';

const Input = () => {
    const [{ user, currentRoomId: roomId }] = useContext(UserContext);
    const [message, setMessage] = useState();
    const [photo, setPhoto] = useState(null);

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

    const sendMessage = async (e) => {
        e.preventDefault();

        // Photo message
        if (photo) {
            let photoUrl = await uploadPhotoToDb(roomId, photo.file);
            postMessages(photoUrl, "image", roomId, user);
            setPhoto(null);
        }    

        // Text message
        if (message) {
            postMessages(message, "text", roomId, user);
            setMessage('');
        }
    }
    
    return (
        <div className="chat_footer">
            <div className="input__container">
                <form>
                    <input
                        className="input"
                        placeholder="Write your message..."
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
                    <input type="file" name="image" id="uploadMessage" onChange={onFileChange} />
                </form>
                <IconButton>
                    <label htmlFor="uploadMessage" style={{ display: "flex", alignItems: "center" }}><ImageIcon /></label>
                </IconButton>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton onClick={event => sendMessage(event)}>
                    <SendIcon />
                </IconButton>
            </div>
            {photo && (
                <div className="input__container preview">
                    <div className="preview__container">
                        <img src={photo.previewUrl} alt="preview" className="preview__img" />
                        <span className="delete" onClick={() => setPhoto(null)}><HighlightOffIcon /></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Input;