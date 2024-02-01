import {useState} from 'react'
import "./ownpostbox.css";
import Miniprofile from '../miniprofile/Miniprofile';
import {FaTrashAlt, FaEdit, FaBan} from "react-icons/fa";
import Moment from 'moment';

//PURPOSE:This component is for editing and deleting of own post
//UTILIZED IN: Profilepage
//Buttons: For Edit and Delete

const Ownpostbox = ({_id, date, content, fullName, email, oneChar, numPost, setNumPost, setPosts,posts }) => {
    const [ newContent, setNewContent] = useState("");
    const [ tempContent, setTempContent] = useState("");

    //If editing is true, it means the user can edit the post since the post will become a text field
    //If false it will be a normal post box
    const [editing,setEditing] = useState(false);

    //PURPOSE: Deletes own Post
    //          Deletes post from database
    const handleDelete = async()=>{
        await fetch("/api/post/deletePost/"+_id, 
            {method: 'POST',
            headers: { 'Content-Type' : 'application/json'}});  
        let tempArray = [...posts]; // make a separate copy of the array
        const index = tempArray.map(object => object._id).indexOf(_id);
        if (index !== -1) {
            tempArray.splice(index, 1);
            setPosts(tempArray);
        }
        setNumPost(numPost-1)
    }

    //PURPOSE: Edits own Post
    //         Update post from database

    const handleSubmit = async() => {
        await fetch("/api/post/editPost/"+_id+"/"+newContent, 
            {method: 'POST',
            headers: { 'Content-Type' : 'application/json'}});  
        setTempContent(newContent)
    }

    const formatted_date = Moment(date).format("MMM Do YY");  
    return (
        <div className='timelinebox-container'>
            <div className='timelinebox-wrapper'>
                <div className='owntimelinebox-firstpart'>
                    <div className='timelinebox-firstpart-left'>
                        <div className='timelinebox-miniprofile'>
                            <Miniprofile
                                fullName={fullName}
                                email={email}
                                oneChar={oneChar}
                            />
                        </div>
                        <div className='timelinebox-time'>
                            <p className='timelinebox-time-text'> {formatted_date} </p>
                        </div>
                    </div>
                    <div className='timelinebox-firstpart-right'>
                        {!editing ?
                            <div className="timelinebox-firstpart-right-icon">  
                                <FaEdit onClick={()=>{setEditing(true);setNewContent(content);setTempContent(content)}}/>
                                <FaTrashAlt onClick={handleDelete}/> 
                            </div> :
                            <div>
                                <FaBan onClick={()=>setEditing(false)}/>
                            </div>
                        }
                    </div>
                </div>
                <div className='timelinebox-secondpart'>
                    {!editing ? 
                        <p className='timelinebox-text'>
                            {
                                tempContent.length === 0 ?
                                <>{content}</> : <>{tempContent}</>
                            }
                        </p> :
                        <div className='timelinebox-editing'>
                            <input 
                                type = "text"
                                onChange={(e) => setNewContent(e.target.value)} 
                                value={newContent} 
                                className='timelinebox-text-input'
                            />
                            <div className='timelinebox-text-button'>
                                <button onClick={()=>{setEditing(false);handleSubmit()}}> 
                                Post 
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Ownpostbox