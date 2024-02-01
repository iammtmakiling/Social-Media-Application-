import React from 'react'
import "./miniprofilefr.css"

//PURPOSE:This component holds the information of a user friend request.
//        It also handles the accepting and rejecting of a request.
//UTILIZED IN: Sidebar
//BUTTONS: For Accept and Reject

const Miniprofilefr = ({_id, friend_id, fullname, oneChar, email, 
  friendRequestArray, setfriendRequestArray, friendsArray, setFriendsArray
}) => {


  //Purpose: Handles the confirmation
  //        It posts the updated content to the database
  //        Added to Friends, while removing from friend requests
  const handleConfirm = async() => {
    await fetch("/api/user/acceptRequest/"+friend_id+"/"+_id, { 
      method: 'POST', 
      headers: { 'Content-Type' : 'application/json'}})

    var tempArray = [...friendRequestArray]; // make a separate copy of the array
    const index = tempArray.map(object => object.email).indexOf(email);

    if (index !== -1) {
      tempArray.splice(index, 1);
      setfriendRequestArray(tempArray);
    }    

    //Add Friend to Friends Array
    const newFriend = {           
      fullName: fullname,
      email: email,
      oneChar: oneChar,
      friend_id: friend_id
    }
    setFriendsArray(new Array (...friendsArray,newFriend))

    // handleFriendSuggestion()
  }

  //Purpose: Handles the rejection
  //        It posts the updated content to the database
  //        Removing from friend requests
  const handleReject = async() => {
    await fetch("/api/user/rejectRequest/"+friend_id+"/"+_id, { 
      method: 'POST', 
      headers: { 'Content-Type' : 'application/json'}})

    let tempArray = [...friendRequestArray]; // make a separate copy of the array
    const index = tempArray.map(object => object.email).indexOf(email);
    if (index !== -1) {
      tempArray.splice(index, 1);
      setfriendRequestArray(tempArray);
    }

    // handleFriendSuggestion()
  }

  return (
    <div className='sidebar-friendsfr-box'>
        <div className='sidebar-friends-info'>
          <div className='sidebar-friends-circle'>{oneChar}</div>
          <div className='sidebar-friends-name'>
              <p className='sidebar-friends-fullname'>{fullname}</p>
              <p className='sidebar-friends-username'>{email}</p>
          </div>
        </div>
        <div className='sidebar-friends-buttons'>
          <button onClick={handleConfirm} className='confirm-button'>
              Confirm
          </button>
          <p>|</p>
          <button onClick={handleReject} className='reject-button'>
              Reject
          </button>
        </div>
    </div>
  )
}

export default Miniprofilefr