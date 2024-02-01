import {useEffect, useState} from 'react';
import "./friendsprofilepage.css";
import { Timelinebox } from '../../components';
import {Creatorbox, Friendsuggestion, Navbar, Sidebar} from '../../containers';
import {useLocation} from 'react-router-dom';
import { useUserAppContext } from '../../context/UserContext';
import { DotLoader } from 'react-spinners';


//PURPOSE: Shows after searching in Navbar
const Friendsprofilepage = () => {
  //All
  const {firstName, lastName, email, _id,friends} = useUserAppContext();
  const [loading, setLoading] = useState(true);
  const [tempFriends, setTempFriends] = useState([])
  const [tempFriendRequest, setTempFriendRequest] = useState([])
  const [tempPendingRequest, setTempPendingRequest] = useState([])

  //SideBar
  const [numPost, setNumPost] = useState(0);
  const { state } = useLocation();

  //For Middle
  const [posts, setPosts] = useState([]);

  //Right Sidebar
  const [users, setUsers] = useState([])

  //PURPOSE: Shows users Name, email and posts
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/post/getOwnPost/"+state.id, { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const post = await response.json();
        const data = post.data;
        console.log(data)

        await Promise.all(data.map(async(item, key)=>{
          const response2 = await fetch("/api/user/getUser/"+state.id, { 
            method: 'GET', 
            headers: { 'Content-Type' : 'application/json'}})
          const user = await response2.json();
          const userData = user.data;
          // console.log(userData)
          return({
            createdAt: item.createdAt,
            content: item.content,
            fullName: userData.name,
            email: userData.email,
            oneChar: userData.name.split('')[0]
          })
        })).then((value)=>{setPosts(value)})

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
  },[posts])

  return (
    <div className='home-container'>
      {console.log(state)}
      <Navbar />
      {loading ? 
        <div className="centeredSpinner">
            <DotLoader
            size={80}
            color={'#4f4a47'}
            loading={loading}
            />
        </div>:
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
          <div className='home-middle-text'>
            <p className='normal-text'>{state.name}</p>
            <p className='small-text'>{state.email}</p>
          </div>
          <div className='home-middle-reversed'>
          {posts.map((item, index)=> (
            <Timelinebox 
              date={item.createdAt} 
              content={item.content}
              fullName={item.fullName}
              email={item.email}
              oneChar={item.oneChar}
              key={item.createdAt + item.content + index}
            />
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

export default Friendsprofilepage