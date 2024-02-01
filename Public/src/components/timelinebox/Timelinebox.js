import React from 'react'
import "./timelinebox.css";
import Miniprofile from '../miniprofile/Miniprofile';
import Moment from 'moment';

//PURPOSE: This component is used to hold posts
//UTILIZED IN: Home
const Timelinebox = ({date, content, fullName, email, oneChar }) => {
  const formatted_date = Moment(date).format("MMM Do YY");
  return (
    <div className='timelinebox-container'>
        <div className='timelinebox-wrapper'>
            <div className='timelinebox-firstpart'>
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
            <div className='timelinebox-secondpart'>
                <p className='timelinebox-text'>{content}</p>
            </div>
        </div>
    </div>
  )
}

export default Timelinebox