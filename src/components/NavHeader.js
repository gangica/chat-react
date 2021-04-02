import React, { useContext } from 'react';
import '../css/Sidebar.css';
import { UserContext } from '../context/StateProvider';
import { auth } from '../context/firebase';

import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavHeader = () => {
    const [{ user }] = useContext(UserContext);

    const logout = async () => {
        await auth.signOut()
    }

    return (
        <>
            <div className="setting__header">
                <Avatar src="https://www.flaticon.com/svg/vstatic/svg/1041/1041916.svg?token=exp=1616408251~hmac=187aa66236b024dc0a3b31be23ea598f" />
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