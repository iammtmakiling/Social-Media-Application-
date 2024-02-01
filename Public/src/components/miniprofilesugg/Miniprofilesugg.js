import React from 'react'
import "./miniprofilesugg.css"
import {FaPlusCircle} from "react-icons/fa";

//PURPOSE:This component holds the information of other users.
//        It also handles the adding of friends
//UTILIZED IN: Friend Suggestions
const Miniprofilesugg = ({_id, friend_id, fullname, email, setUsers, 
  users, setTempPendingRequest, tempPendingRequest
  }) => {

  //Purpose: Handles the Adding of Friend
  //        It posts the updated content to the database
  //        Added to Friend's Friend Request, and added to one's Pending Request
  const handleAddFriend = async()=> {
    await fetch("/api/user/addFriend/"+friend_id+"/"+_id, { 
      method: 'POST', 
      headers: { 'Content-Type' : 'application/json'}})

    let tempArray = [...users]; // make a separate copy of the array
    const index = tempArray.map(object => object.email).indexOf(email);
    if (index !== -1) {
      tempArray.splice(index, 1);
      setUsers(tempArray);
    }

    let tempArray2 = [...tempPendingRequest]; // make a separate copy of the array
    const index2 = tempArray2.map(object => object.email).indexOf(email);
    if (index2 !== -1) {
      tempArray2.splice(index, 1);
      setTempPendingRequest(tempArray2);
    }
  }

  return (
    <div className='sidebar-friendsugg-box'>
        <div className='sidebar-friends-circle'>{fullname.split('')[0]}</div>
        <div className='sidebar-friends-name'>
            <p className='sidebar-friends-fullname'>{fullname}</p>
            <p className='sidebar-friends-username'>{email}</p>
        </div>
        <FaPlusCircle onClick={handleAddFriend} className='miniprofilesugg-icon'/>
    </div>
  )
}

export default Miniprofilesugg