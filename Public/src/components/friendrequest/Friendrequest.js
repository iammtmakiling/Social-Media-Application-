import React from 'react'
import "./friendrequest.css";
import Miniprofilefr from '../miniprofilefr/Miniprofilefr';
import { FaUserPlus } from "react-icons/fa";


//PURPOSE:This component is used to hold the friend request of the user
//UTILIZED IN: Sidebar
//CONTAINS: Miniprofilefr of the friend request for accepting and rejecting

const Friendrequest = ({_id, friendRequestArray, setfriendRequestArray, friendsArray, setFriendsArray
}) => {
  return (
    <div className='sidebar-friendrequest'>
      <div className='sidebar-friends-user'>
          <FaUserPlus className='sidebar-friends-icon'/>
          <p className='sidebar-friends-text'>Friend Request</p>
      </div>
      <div className='sidebar-friendrequests'>
      {friendRequestArray.map((item, index)=> (
        <Miniprofilefr
          _id={_id}
          friend_id={item._id} 
          fullname={item.fullName}
          oneChar={item.oneChar}
          email={item.email}
          friendRequestArray={friendRequestArray}
          friendsArray={friendsArray} 
          setfriendRequestArray={setfriendRequestArray}
          setFriendsArray={setFriendsArray}
          key={item.friend_id + item.email + index}
        />
      ))}
      </div>
    </div>
  )
}

export default Friendrequest