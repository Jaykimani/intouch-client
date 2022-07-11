import React, { useContext } from "react";
import "./leftbar.css"
import RssFeedIcon from '@material-ui/icons/RssFeed';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideocamIcon from '@material-ui/icons/Videocam';
import PeopleIcon from '@material-ui/icons/People';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import EventIcon from '@material-ui/icons/Event';
import WorkIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';
import { UserContext } from '../../context/context';
import { Link } from "react-router-dom";


export default function Leftbar() {
  const {state} = useContext(UserContext);
  const {user} = state;
  const photos = process.env.REACT_APP_PUBLIC_FOLDER;

  return <div className="leftbar">
         <div className="top-part">
           <img className="dpic" src={photos + user.profilepicture} alt="" />
           <div className="name-status">
             <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none', color: "black" }}>
             <p>{user.username}</p>
             </Link>
             <p className="online">Online</p>
           </div>
         </div>
         <div className="content">
          <RssFeedIcon />
          <p>Feeds</p>
         </div>
         <div className="content">
          <QuestionAnswerIcon />
          <p>Chats</p>
         </div>
         <div className="content">
          <VideocamIcon />
          <p>Videos</p>
         </div>
         <div className="content">
          <PeopleIcon />
          <p>Groups</p>
         </div>
         <div className="content">
          <BookmarksIcon />
          <p>Bookmarks</p>
         </div>
         <div className="content">
          <EventIcon />
          <p>Events</p>
         </div>
         <div className="content">
          <WorkIcon />
          <p>Jobs</p>
         </div>
         <div className="content">
          <SettingsIcon />
          <p>Settings</p>
         </div>

        
         </div>;
}
