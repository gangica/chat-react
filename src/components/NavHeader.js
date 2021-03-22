import React, { useContext } from 'react';
import '../css/Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { UserContext } from '../context/StateProvider';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../context/firebase';

const NavHeader = () => {
    const [{ user }] = useContext(UserContext);

    const logout = async () => {
        await auth.signOut()
    }

    return (
        <>
            <div className="setting__header">
                <InfoIcon />
                <h4>Chatime</h4>
                <IconButton onClick={logout}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
            <div className="profile__pic">
                <Avatar src={user.photoURL} alt="avatar" />
                <h4 className="username">{user.displayName}</h4>
            </div>
        </>
    )
};

export default NavHeader;