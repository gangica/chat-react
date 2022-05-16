import React, { useContext, useState, useEffect } from 'react';
import { downloadPhotos, getRoomMembers } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import '../css/SidebarUser.css';

import { Avatar } from '@material-ui/core';

const ChatInfoTabs = () => {
    const [{ currentRoomId: roomId }] = useContext(UserContext);
    const [tab, setTab] = useState("members");
    const [members, setMembers] = useState();
    const [media, setMedia] = useState([]);

    const getMedia = async () => {
        let media = await downloadPhotos(roomId);
        setMedia(media)
    }
    
    useEffect(() => {
        getRoomMembers(roomId, setMembers);
    }, [roomId])

    useEffect(() => {
        getMedia()
    }, [roomId, media])

    const renderContent = () => {
        switch (tab) {
            case "members":
                return members.map((member, i) => (<div key={i} className="members__info">
                    <Avatar src={member.data.photoURL} alt="avatar" />
                    <h4>{member.data.name}</h4>
                </div>))
            
            case "media":
                return <div className="grid">{media && media.map((url, i) => <img key={i} src={url} />)}</div>
        }
    }

    return (
        <div className="setting__section">
            {(members && media) && (
                <>
                    <div className="tabs">
                        <button className={tab === "members" ? "btn btn__active" : "btn"} 
                            onClick={() => setTab("members")}>Members{' (' + members.length + ')'}</button>
                        <button className={tab === "media" ? "btn btn__active" : "btn"}
                            onClick={() => setTab("media")}>Media</button>
                    </div>
                    <div className="tab__content">
                        {renderContent()}
                    </div>
                </>
            )}
        </div>
    )
};

export default ChatInfoTabs;