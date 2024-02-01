import React, { useEffect, useState } from 'react';
import './homePosts.css';
import { Timelinebox } from "../../components";
import MoonLoader from 'react-spinners/MoonLoader';
const HomePosts = ({_id, friendsArray, setPosts, posts, setNumPost}) => {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        (async () => {
            try {
            //Get Posts
            const idArray = new Array (_id,...friendsArray)
            const constraint = JSON.stringify(idArray)
            const response = await fetch("/api/post/getPost/"+constraint, { 
            method: 'GET', 
            headers: { 'Content-Type' : 'application/json'}})
            const post = await response.json();
            const data = post.data;

            //Get Posts Contents
            await Promise.all(data.map(async(item, key)=>{
            const response2 = await fetch("/api/user/getUser/"+item.createdBy, { 
                method: 'GET', 
                headers: { 'Content-Type' : 'application/json'}})
            const user = await response2.json();
            const userData = user.data;

            return({
                createdAt: item.createdAt,
                content: item.content,
                fullName: userData.name,
                email: userData.email,
                oneChar: userData.name.split('')[0]
            })
            })).then((value)=>{setPosts(value)})

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
    <div className='homePostsContainer'>
        { !loading ? <>
            <div className="home-middle-reversed">
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
            </> : <div className="sidebarSpinner">
                <MoonLoader
                    size={40}
                    color={'#4f4a47'}
                    loading={loading}
                />
            </div>
            }

    </div>
  )
}

export default HomePosts;