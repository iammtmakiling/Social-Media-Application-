import React, {useEffect, useState} from 'react'
import "./friendsuggestion.css"
import { Miniprofilesugg } from '../../components';
import { FaUserPlus } from "react-icons/fa";
import MoonLoader from 'react-spinners/MoonLoader';

//PURPOSE:This component is used to hold the Information of ather users not yet friends of the user
const Friendsuggestion = ({friendRequest,_id,friends, tempPendingRequest, setTempPendingRequest}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  //Purpse: Sets the user to be shown in the suggestions
  useEffect(()=>{
    (async () => {
      try {
        const idArray2 = new Array (...friendRequest,_id,...friends,...tempPendingRequest)
        const idConstraint = JSON.stringify(idArray2)
        const response3 = await fetch("/api/user/getOtherUsers/"+idConstraint, { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const user = await response3.json();
        const data2 = user.data;
        setUsers(new Array(...data2))

      } catch (er) {
        console.log(er);
      }
      setLoading(false)
    })()
  },[])

  //Only Show suggestion if other users are available
  //Loads the suggestion first before showing

  return (
    <div className='friendsuggestion-container'>
      {loading ? 
        <div className="suggSpinner">
          <MoonLoader
            size={40}
            color={'#4f4a47'}
            loading={loading}
          />
        </div>:<>
        {users.length === 0 ? <></> : <>
            <div className='friendsuggestion-wrapper'>
              <div className='friendsuggestion-firstpart'>
                  <FaUserPlus className='friendsuggestion-icon'/>
                  <p className='friendsuggestion-text'>Friend Suggestion</p>
              </div>
              <div className='friendsuggestion-secondpart'>
                  {users.map((item, index)=> (
                    <Miniprofilesugg 
                      fullname={item.firstName +" "+item.lastName}
                      users={users}
                      email={item.email} 
                      friend_id={item._id}
                      _id={_id}
                      key={item._id + index}
                      setUsers={setUsers}
                      tempPendingRequest={tempPendingRequest}
                      setTempPendingRequest={setTempPendingRequest}
                    />
                  ))}
              </div>
            </div> 
          </>}
        </>}   
    </div>
  )
}

export default Friendsuggestion