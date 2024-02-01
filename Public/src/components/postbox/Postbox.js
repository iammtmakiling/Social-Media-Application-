import React from 'react';
import "./postbox.css";
import {useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { PostSchema } from '../../assets/schema';
import { useUserAppContext } from '../../context/UserContext';

//PURPOSE: This component is for posting
//UTILIZED IN: Home and Profilepage

const Postbox = ({setPosts, numPost, setNumPost, updatePost, method}) => {
  const {register, handleSubmit, reset} = useForm({ resolver: yupResolver(PostSchema)});
  const {_id, firstName} =useUserAppContext();
  
  //PURPOSE: Submits if post is clicked
  const submitForm = async(data) => {
    const newDate = new Date();

    const postBody = {createdAt:newDate, content: data.content, createdBy:_id}
    await fetch("/api/post", {method: 'POST', body: JSON.stringify(postBody), headers: { 'Content-Type' : 'application/json'}});

    const response = await fetch("/api/user/getUser/"+_id, { 
      method: 'GET', 
      headers: { 'Content-Type' : 'application/json'}})
    const user = await response.json();
    const userData = user.data;

    // Since posting is used in Home and Profilepage
    // method will be used to check where it is used
    //if Method is not equal to 1 it is used in Profilepage
    //if not, it is used in home
    if (method !== 1){
      const response2 = await fetch("/api/post/getOwnPost/"+_id, { 
        method: 'GET', 
        headers: { 'Content-Type' : 'application/json'}})
      const post = await response2.json();
      const newPosts = post.data;
      setPosts(newPosts)
   
    }else{
      const homePost = {          
        createdAt: newDate,
        content: data.content,
        fullName: userData.name,
        email: userData.email,
        oneChar: userData.name.split('')[0]}
      updatePost(homePost)
    }
    reset();

    //Updated Numpost for stats
    setNumPost(numPost+1)
  }

  return (
    <div className='postbox-container'>
        <div className='postbox-wrapper'>
            <form onSubmit={handleSubmit(submitForm)}>
                <p className='postbox-header'>Write a new Post</p>
                <div className='postbox-post'>
                    <div className='postbox-circle'>{firstName.split('')[0]}</div>
                    <input 
                      placeholder="What's on your mind?"
                      className='postbox-input'
                      {...register('content')}
                    />  
                </div>
                <hr className='postbox-line'></hr>
                <div className='postbox-button'> 
                    <button>Post</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Postbox