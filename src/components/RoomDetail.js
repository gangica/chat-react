import React, { useState } from 'react';
import '../css/SidebarUser.css';
import { Avatar } from '@material-ui/core';

const RoomDetail = ({ members, media }) => {
    const [tab, setTab] = useState("members");

    const renderContent = () => {
        switch (tab) {
            case "members":
                return members.map((member, i) => (<div key={i} className="members__info">
                    <Avatar src={member.data.photoURL} alt="avatar" />
                    <h4>{member.data.name}</h4>
                </div>
                ))
            
            case "media":
                return <div className="grid">{media && media.map((url, i) => <img key={i} src={url} />)}</div>
        }
    }

    return (
        <div className="setting__section">
            <div className="tabs">
                <button className="btn" onClick={() => setTab("members")}>Members{' (' + members.length + ')'}</button>
                <button className="btn" onClick={() => setTab("media")}>Media</button>
            </div>
            <div className="tab__content">
                {renderContent()}
            </div>
        </div>
    )
};

export default RoomDetail;