import React from 'react'
import "./miniprofile.css"

//PURPOSE:This component is used to hold the Basic Information of a user
//UTILIZED IN: Sidebar, Friend Suggestions, Posts
const Miniprofile = ({fullName, email, oneChar}) => {
  return (
    <div className='sidebar-friends-box'>
        <div className='sidebar-friends-circle'>{oneChar}</div>
        <div className='sidebar-friends-name'>
            <p className='sidebar-friends-fullname'>{fullName}</p>
            <p className='sidebar-friends-username'>{email}</p>
        </div>
    </div>
  )
}

export default Miniprofile