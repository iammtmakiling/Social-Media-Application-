import React from 'react'
import "./stats.css";

//PURPOSE: This component is used to hold the statistics of the User
//UTILIZED IN: Sidebar

const Stats = ({numPost, friendRequest, friends}) => {
  return (
    <div className='sidebar-stats'>
    <div className='sidebar-stats-box'>
        <p className='sidebar-stats-text'> POST </p>
        <p className='sidebar-stats-number'>{numPost}</p>
    </div>
    <div className='sidebar-stats-box'>
        <p className='sidebar-stats-text'> FRIENDS </p>
        <p className='sidebar-stats-number'>{friends.length}</p>
    </div>
    <div className='sidebar-stats-box'>
        <p className='sidebar-stats-text'> REQUESTS </p>
        <p className='sidebar-stats-number'>{friendRequest.length}</p>
    </div>
</div>
  )
}

export default Stats