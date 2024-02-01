import React from 'react';
import "./creatorbox.css";

//PURPOSE:This component is used to hold the Basic Information of the developer of the program
const Creatorbox = () => {
  return (
    <div className='creatorbox-container'>
        <div className='creatorbox-wrapper'>
            <p className='creatorbox-header'>About the Creator</p>
            <div className='creatorbox-firstpart'> 
                <div className='creatorbox-circle'>M</div>
                <div className='creatorbox-name'>
                    <p className='creatorbox-name-text'>Michael Jay Makiling</p>
                    <p className='creatorbox-username'>@iammtmakiling</p>
                </div>
            </div>
            <div className='creatorbox-secondpart'>
                <p className='creatorbox-name-text'>
                    BS Computer Science Student
                </p>
                <p className='creatorbox-name-text'>
                    UP Los Banos - Sophomore
                </p>
            </div>
        </div>
    </div>
  )
}

export default Creatorbox