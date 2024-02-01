import React from 'react';
import "./friends.css";
import Miniprofile from '../miniprofile/Miniprofile';
import { FaUserFriends } from "react-icons/fa";

//PURPOSE:This component is used to hold the friends user
//UTILIZED IN: Sidebar
//CONTAINS: Miniprofile of the friends
const Friends = ({friendsArray}) => {
  return (
    <div className='sidebar-friends'>
    <div className='sidebar-friends-user'>
        <FaUserFriends className='sidebar-friends-icon'/>
        <p className='sidebar-friends-text'>Friends</p>
    </div>
      {friendsArray.map((item, index)=> (
        <Miniprofile
          fullName={item.fullName}
          email={item.email}
          oneChar={item.oneChar}
          key={item.friend_id+item.email+index}
        />
      ))}
    </div>
  )
}

export default Friends