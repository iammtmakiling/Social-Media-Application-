import React, { useState, useEffect } from "react";
import "./home.css";
import { Postbox, Timelinebox, HomePosts } from "../../components";
import DotLoader from 'react-spinners/DotLoader';
import {
  Creatorbox,
  Friendsuggestion,
  Navbar,
  Sidebar,
} from "../../containers";
import { useUserAppContext } from '../../context/UserContext';

//PURPOSE: This page shows the post of the user as well as other users posts
const Home = () => {
  //All
  const {firstName, lastName, email, _id, friends} = useUserAppContext();
  const [loading, setLoading] = useState(true);
  const [tempFriends, setTempFriends] = useState([])
  const [tempFriendRequest, setTempFriendRequest] = useState([])
  const [tempPendingRequest, setTempPendingRequest] = useState([])
  const [method,setMethod] = useState(1); //If 1 Posting will be from Home

  //Left SideBar
  const [numPost, setNumPost] = useState(0);

  //Middle
  const [posts, setPosts] = useState([]);

  //Right Sidebar
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      try {
        //Get Self Contents
        const response2 = await fetch("/api/user/getUser/"+_id, { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const self = await response2.json();
        const dataSelf = self.data;
        setTempFriends(dataSelf.friends)
        setTempFriendRequest(dataSelf.friendRequest)
        setTempPendingRequest(dataSelf.pendingRequest)
      } catch (er) {
        console.log(er);
      }
      setLoading(false)
    })()
  },[])

  return (
    <div className="home-container">
          <Navbar />
          { loading ? 
          <div className="centeredSpinner">
              <DotLoader
              size={80}
              color={'#4f4a47'}
              loading={loading}
              />
          </div> : <div>
          <div className="home-wrapper">
            <div className="home-left">
              <Sidebar 
                firstName={firstName}
                lastName={lastName}
                email={email}
                _id={_id}
                friends={tempFriends}
                friendRequest={tempFriendRequest}
                numPost={numPost}
              />
            </div>
            <div className="home-middle">
              <p className="home-middle-text">HOME FEED</p>
              <Postbox
                updatePost={(value)=>setPosts(new Array(...posts,value))}
                setNumPost={(value)=>setNumPost(value)}
                numPost={numPost}
                method={method}
              />
              <HomePosts
                _id={_id}
                friendsArray={tempFriends}
                setPosts={setPosts}
                posts={posts}
                setNumPost={(value)=>setNumPost(value)}
              />
            </div>
            <div className="home-right">
              <div className="home-right-contents">
                <Creatorbox />
                    <Friendsuggestion 
                    friendRequest={tempFriendRequest}
                    _id={_id}
                    friends={tempFriends}
                    users={users}
                    setUsers={(value)=>setUsers(value)}
                    tempPendingRequest={tempPendingRequest}
                    setTempPendingRequest={(value)=>setTempPendingRequest(value)}
                  />
                <div className='home-right-ad'>
                  <div className="home-right-suggested">
                    <div className="suggested-container"> 
                      <p className="suggested-header-text">Music</p>
                      <p className="suggested-text-small">	• Suggested for you</p>
                    </div>
                    <div className="suggested-photo"></div>
                    <p className="suggested-header-text">Blackpink</p>
                    <p className="suggested-text-small">As if it's your Last</p>
                    <button>
                      <a href="https://open.spotify.com/album/7ikmjsvRzDRzxHN0KXSQdv?highlight=spotify:track:4ZxOuNHhpyOj4gv52MtQpT">Listen</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
