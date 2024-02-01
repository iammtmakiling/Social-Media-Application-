import React from 'react';
import "./profilebox.css";
import { useNavigate } from "react-router-dom";

//PURPOSE:This component is used to hold the Basic Information of a user
//UTILIZED IN: Sidebar
const Profilebox = ({firstName, lastName, email}) => {
  let navigate = useNavigate();
  return (
    <div className='sidebar-profile'>
        <div className="sidebar-profile-square"></div>
        <div className="sidebar-profile-content">
                <div className='sidebar-profile-circle'>{firstName.split('')[0]}</div>
                <div className="sidebar-profile-name"
                      onClick={() => {
                        navigate("/profilepage");
                      }}
                    >
                    <p className="sidebar-profile-text-name">{firstName}</p>
                    <p className="sidebar-profile-text-name">{lastName}</p>
                    <p className="sidebar-profile-text">{email}</p>
                </div>
        </div>
    </div>
  )
}

export default Profilebox