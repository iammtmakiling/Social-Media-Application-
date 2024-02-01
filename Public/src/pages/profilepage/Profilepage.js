import {useEffect, useState} from 'react';
import "./profilepage.css";
import { Postbox, Ownpostbox } from '../../components';
import {Creatorbox, Friendsuggestion, Navbar, Sidebar} from '../../containers';
import { useUserAppContext } from '../../context/UserContext';
import { DotLoader } from 'react-spinners';

//PURPOSE: This page shows the users own page
//        Here they can edit and delete their own post
const Profilepage = () => {
  //All
  const {firstName, lastName, email, _id, friends, name} = useUserAppContext();
  const [loading, setLoading] = useState(true);
  const [oneChar, setOneChar] = useState('')
  const [tempFriends, setTempFriends] = useState([])
  const [tempFriendRequest, setTempFriendRequest] = useState([])
  const [tempPendingRequest, setTempPendingRequest] = useState([])
  const [method,setMethod] = useState(0); //If 1 Posting will be from Profilepage

  //Left SideBar
  const [numPost, setNumPost] = useState(0);

  //For Middle
  const [posts, setPosts] = useState([]);

  //Right Sidebar
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/post/getOwnPost/"+_id, { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const post = await response.json();
        const data = post.data;
        setPosts(new Array(...data))
        setOneChar(name.split('')[0])

        //Get Self Contents
        const response2 = await fetch("/api/user/getUser/"+_id, { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const self = await response2.json();
        const dataSelf = self.data;
        setTempFriends(dataSelf.friends)
        setTempFriendRequest(dataSelf.friendRequest)
        setTempPendingRequest(dataSelf.pendingRequest)

        //For Numpost
        let counter = 0;
        for(let i = 0; i < data.length; i++){
          if(data[i].createdBy === _id){
            counter++;
          }
        }
        setNumPost(counter)

      } catch (er) {
        console.log(er);
      }    
      setLoading(false)
    })()
  },[])

  return (
    <div className='home-container'>
      <Navbar />
      {loading ? 
        <div className="centeredSpinner">
            <DotLoader
            size={80}
            color={'#4f4a47'}
            loading={loading}
            />
        </div> :
        <div className='home-wrapper'>
          <div className='home-left'>
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
        <div className='home-middle'>
          <p className='home-middle-text'>{name}</p>
          <Postbox
            setPosts={(value)=>setPosts(value)}
            setNumPost={(value)=>setNumPost(value)}
            numPost={numPost}
            method={method}
          />
          <div className='home-middle-reversed'>
          {posts.map((item, index)=> (
            <Ownpostbox 
              _id={item._id}
              date={item.createdAt}
              content={item.content}
              fullName={name}
              email={email}
              oneChar={oneChar}
              setNumPost={(value)=>setNumPost(value)}
              numPost={numPost}
              setPosts={(value)=>setPosts(value)}
              posts={posts}
              key={item.createdBy + index}/>
          ))}
          </div>
        </div>
        <div className='home-right'>
          <div className='home-right-contents'>
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
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Profilepage