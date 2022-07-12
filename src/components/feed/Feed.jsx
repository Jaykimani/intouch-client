import React, {useContext, useEffect, useRef, useState} from 'react';
import * as timeago from 'timeago.js';
import "./feed.css"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useHistory} from "react-router-dom";
import {axiosInstance} from "../../config"
import { UserContext } from '../../context/context';


export default function Feed({info}) {
  const {state} = useContext(UserContext);
  const navigate = useHistory();
  const [user, setUser] = useState({});
  const photos = process.env.REACT_APP_PUBLIC_FOLDER;
  const [likes, setLikes] = useState(info.likes.length);
  const [isLiked, setIsLiked]= useState(false);
  const comment = useRef();
  const [viewComments, setViewComments] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(info.comments.length);
  const [userComments, setUserComments] = useState(info.comments);
  
  
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const postOwner = await axiosInstance.get(`/users?userId=${info.userId}`);
        setUser(postOwner.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [info.userId] )
 
const handleClick = async (e)=>{
  let clickedName = e.currentTarget.innerHTML;
   try {
     let clickedUser = await axiosInstance.get(`/users?username=${clickedName}`);
     let nameId = clickedUser.data._id;  
     navigate.push(`/profile/${nameId}`);
   } catch (error) {
     console.log(error)
   }
}

const handleLike = async ()=>{
  await axiosInstance.put(`/posts/${info._id}/like`, [state.user, info.userId]);
  setIsLiked(!isLiked);
  
  !isLiked ? setLikes(likes + 1) : setLikes(likes - 1);
}

const handleComment = async ()=>{
 if(comment.current.value){

  const commentObj = {
       commentUser: info.userId,
       userpic : state.user.profilepicture,
       username : state.user.username,
       desc : comment.current.value
  }
  try {
    await axiosInstance.put(`/posts/${info._id}/comment`, commentObj);
    setCommentsNumber(commentsNumber + 1)
    const postComments = await axiosInstance.get(`/posts/${info._id}`);
    setUserComments(postComments.data.comments);
    
    comment.current.value = "";
  } catch (error) {
    console.log(error)
  }
}else{
  return null;
}

}

const handleView = async ()=>{
  setViewComments(!viewComments);
  try{
    const postComments = await axiosInstance.get(`/posts/${info._id}`);
   setUserComments(postComments.data.comments);
   
  }catch(err){
    console.log(err)
  }
}

  return <div className="feed">
         <div className="feed-top">
             <img src={photos + user.profilepicture} alt="" />
             <div className="feed-info">
                 
                 <p onClick={handleClick}>{user.username}</p>
                
                 <p>{timeago.format(info.createdAt)}</p>
             </div>
         </div>
         <div className="feed-caption">
             <p>{info.description}</p>
         </div>
         {info.image ? <img className="feed-image" src={photos + info.image} alt="" /> : null}
         <div className="feed-likes">
             <div className="feed-icons">
               <ThumbUpAltIcon color="primary" onClick={handleLike}/>
               <FavoriteIcon color="secondary" onClick={handleLike}/>
               <p>{likes} likes</p>
             </div>
             <button type="button" onClick={handleView}>{commentsNumber} Comments</button>
         </div>
         <div className="feed-comments">
           {viewComments ?  <div>
      {userComments.map((item,index)=>{

           return( <div className="people-comment" key={index}>
            <img src={photos + item.userpic} alt="" />
            <div className="comment-info">
              <h5>{item.username}</h5>
              <p>{item.desc}</p>
            </div>
          </div>)
           })} </div> : null }
           
           
           <div className="comment">
             <img src={photos + state.user.profilepicture} alt="" />
           <input type="text" ref={comment} placeholder="write a comment..."/>
            <button type="button" onClick={handleComment}>Comment</button>
           </div>
           
         </div>
  </div>;
}
