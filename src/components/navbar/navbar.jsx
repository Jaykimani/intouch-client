import React, { useContext, useState, useEffect } from 'react';
import "./navbar.css"
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link} from "react-router-dom";
import { UserContext } from '../../context/context';
import {useHistory} from "react-router-dom";


export default function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  const {user} = state;
  const [setting, setSetting]= useState(false);
  const [requests, setRequests] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [outputReqs, setOutputReqs] = useState([]);
  const [outputNotifs, setOutputNotifs] = useState([]);
  const navigate = useHistory();
  
  useEffect(()=>{
    
    let requestsOrder = function (){
      let outputRequests = [];
      let outputNotifications = [];
      for(let i = user.requests.length - 1; i >= 0; i--){
        outputRequests.push(user.requests[i]); 
     }
       for(let i = user.notifications.length - 1; i >= 0; i--){
          outputNotifications.push(user.notifications[i]); 
       }
       return [outputRequests, outputNotifications]
    }
    
    setOutputReqs(requestsOrder()[0]);
    setOutputNotifs(requestsOrder()[1]);
  }, []);

  const handleClick = ()=>{
    setNotifications(false);
    setRequests(false);
   setSetting(!setting);
  }
  const handleRequest = ()=>{
    setNotifications(false);
    setSetting(false);
    if(state.user.requests.length === 0){
      setRequests(false);
    }else{
      setRequests(!requests);
    }
    
   }
   const handleNotifs = ()=>{
    setRequests(false);
    setSetting(false);
    setNotifications(!notifications);
   }

  const handleLogout = ()=>{
    dispatch({type: 'LOG-OUT'});
    navigate.push(`/`);  
  }

  return <div className="navbar">
    <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
      <h1>inTouch</h1>
      </Link>
      <div className="search">
          <SearchIcon />
          <input type="text" placeholder="search" />
      </div>
      <div className="homepage">
          <ul>
            <Link to={`/profile/${user._id}`}>
            <li>Profile</li>
            </Link>
            <Link to="/">
            <li>Timeline</li>
            </Link>
          </ul>
      </div>
      <div className="notifications">
          <div className="icons" onClick={handleRequest}>
           <PersonOutlineIcon style={{ fontSize: 30 }} />
           <span>{outputReqs.length}</span>
          </div>
          <div className="icons">
           <ChatBubbleOutlineIcon style={{ fontSize: 28 }}/>
           <span>2</span>
          </div>
          <div className="icons" onClick={handleNotifs}>
           <NotificationsNoneIcon style={{ fontSize: 30 }}/>
           <span>{outputNotifs.length}</span>
          </div>
          <div className={setting ? `icons clock` : `icons anticlock`} onClick={handleClick}>
           <SettingsIcon style={{ fontSize: 30 }} />
          </div>
          <div className={setting ? `logout active` : `logout notActive`} onClick={handleLogout}>
            <h4>Log out</h4>
           </div>
           <div className={requests ? `followings active` : `followings notActive`}>
           
            {outputReqs.map((item, index)=>{
              if(item){
                return (
                  <div className="note">
                  <p key={index}>{item}</p>
                  </div>
                ) 
              }else{
                return null
              }
              
            })}
            
           </div>
           <div className={notifications ? `notifs active` : `notifs notActive`}>
           {outputNotifs.map((item, index)=>{
              if(item){
                return (
                  <div className="note">
                  <p key={index}>{item}</p>
                  </div>
                ) 
              }else{
                return null
              }
              
            })}
           </div>
      </div>

  </div>;
}
