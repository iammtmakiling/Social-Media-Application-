import React, {useState, useEffect} from 'react';
import "./navbar.css";
import { FaSearch, FaBan } from "react-icons/fa";
import { useUserAppContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  //For navigating to other user
  let navigate = useNavigate();

  //For Logging out
  const {name, logOut} = useUserAppContext();
  const [data, setData] = useState([])

  //For Searching
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/user/getAllUsers/", { 
          method: 'GET', 
          headers: { 'Content-Type' : 'application/json'}})
        const user = await response.json();
        const newData = user.data;
        setData(new Array(...newData))
      } catch (er) {
        console.log(er);
      }
    })()
  },[])

  //PURPOSE: Filters the word. Only shows the user being searched
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    //Filtering
    //Returns the filter that returns true
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    });

    //Sets the filtered word in the Filtered data Array
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


  //PURPOSE: Input Clearing
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="navbar-container">
      {console.log(filteredData)}
      <div className="navbar-wrapper">
        <div className="navbar-left">
            <div className='navbar-item-container'>
                <p className="logo"
                onClick={() => {
                  navigate('/home');
                }}
                >CoffiiI</p>
            </div>
        </div>
        <div className="navbar-center"> 
            <div className="navbar-center-input">
              <input 
                className="navbar-search" 
                placeholder="search" 
                type="text" 
                id="search"
                value={wordEntered}
                onChange={handleFilter} 
              ></input>
              <button className="navbar-icon">
                  {filteredData.length === 0 && wordEntered.length === 0 ? (
                    <FaSearch />
                  ) : (
                    <FaBan id="clearBtn" onClick={clearInput} />
                  )}
              </button>
            </div>
            <div className='searched-data'>
              {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.map((value, key) => {
                  return (
                    <div className="dataItem" 
                      key={value.name + key} 
                      onClick={()=>{navigate('/friendsprofilepage',
                          {state:{id:value._id,name:value.name,email:value.email}}
                          )}}>
                      <p className="dataItem_values">{value.name} </p>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
        </div>
        <div className="navbar-right">
            <button type="button" className="navbar-button" onClick={logOut}>
                Log Out
            </button>
            <p 
              onClick={() => {
                navigate('/profilepage');
              }}
            >{name}</p>
            <span className="dot"></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar