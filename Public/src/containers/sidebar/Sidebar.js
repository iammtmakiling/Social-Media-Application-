import React, { useEffect, useState } from 'react'
import "./sidebar.css";
import { Profilebox, Stats, Friends, Friendrequest } from '../../components'
import MoonLoader from 'react-spinners/MoonLoader';


//PURPOSE: This component is used to hold all the informations of the users
//          from personal information, statistics, friends and friend requests
const Sidebar = ({firstName, lastName, email, _id, numPost, friends, friendRequest
  // users, setUsers, tempPendingRequest, setTempPendingRequest
}) => {
    const [friendsArray, setFriendsArray] = useState([]);
    const [friendRequestArray, setfriendRequestArray] = useState([]);
    const [loading, setLoading] = useState(true);

    //PURPOSE: Set the array for friends and friendrequest
    useEffect(()=>{
      (async () => {
        try {
              //For Friends
              await Promise.all(friends.map(async(item, key)=>{
                const response2 = await fetch("/api/user/getUser/"+item, { 
                  method: 'GET', 
                  headers: { 'Content-Type' : 'application/json'}})
                const user = await response2.json();
                const userData = user.data;
                return({
                  fullName: userData.name,
                  email: userData.email,
                  oneChar: userData.name.split('')[0],
                  friend_id:userData._id
                })
              })).then((value)=>{setFriendsArray(value)})
      
              //For Friend Requests
              await Promise.all(friendRequest.map(async(item, key)=>{
                const response2 = await fetch("/api/user/getUser/"+item, { 
                  method: 'GET', 
                  headers: { 'Content-Type' : 'application/json'}})
                const user = await response2.json();
                const userData = user.data;
                return({
                  fullName: userData.name,
                  email: userData.email,
                  _id: userData._id,
                  oneChar: userData.name.split('')[0]
                })
              })).then((value)=>{setfriendRequestArray(value)})
          } catch (er) {
            console.log(er);
          }
          setLoading(false)
      })()
    },[])

    
    //Only shows friends or friend request when they are not empty
    //Shows after loading of data
  return (
    <div className='sidebar-container'>
        <div className='sidebar-wrapper'>
            <Profilebox 
              firstName={firstName}
              lastName={lastName}
              email={email}
            />
            {loading ? 
              <div className="sidebarSpinner">
                <MoonLoader
                size={40}
                color={'#4f4a47'}
                loading={loading}
                />
              </div>:<>
              <div className='sidebar-wrapper-contents'>
                <Stats 
                  numPost={numPost}
                  friendRequest={friendRequestArray}
                  friends={friendsArray}
                />
                {(friendsArray.length !== 0 ?
                  <div>
                    <Friends
                    friendsArray={friendsArray}            
                    />
                  </div>:<div></div>
                )}
                {(friendRequestArray.length !== 0 ?
                  <div>
                    <Friendrequest
                    _id={_id}
                    friendRequestArray={friendRequestArray}
                    friendsArray={friendsArray} 
                    setfriendRequestArray={(value)=>setfriendRequestArray(value)}
                    setFriendsArray={(value)=>setFriendsArray(value)}
                    />
                  </div> : <div></div>
                )}
              </div>
              </>
            }
        </div>
    </div>
  )
}

export default Sidebar