import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';

import './Online.css';

const Online = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map((user, i) => (
                  <div key={i} className="activeItem">
                    {user.name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default Online;