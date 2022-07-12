import "./middlebar.css"
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import DuoIcon from '@material-ui/icons/Duo';
import Feed from "../feed/Feed";
import {axiosInstance} from "../../config";
import { UserContext } from '../../context/context';
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";


export default function Middlebar({own, otherUser}) {
   const {state} = useContext(UserContext);
   const [posts, setPosts] = useState([])
   const [posted, setPosted] = useState(false);
   const desc = useRef();
   const image = useRef();
   const {user} = state;
   const id = useParams();
   
  
   

   useEffect(()=>{
      if(!id.userId){
         const fetchPosts = async ()=>{
            try {
               let post = await axiosInstance.get(`/posts/timeline/${user._id}`); 
               let sortedPosts = post.data.sort((item1, item2)=>{
                  return new Date(item2.createdAt) - new Date(item1.createdAt);
               })
               setPosts(sortedPosts);
            } catch (error) {
               console.log(error)
            }
         }
         fetchPosts();
         setPosted(false);
      }else{
         const fetchPosts = async ()=>{
            try {
               let post = await axiosInstance.get(`/posts/profile/${id.userId}`); 
               console.log(post.data);
               let sortedPosts = post.data.sort((item1, item2)=>{
                  return new Date(item2.createdAt) - new Date(item1.createdAt);
               })
               setPosts(sortedPosts);
            } catch (error) {
               console.log(error)
            }
         }
         fetchPosts();
         setPosted(false);
      }
     
   }, [user._id, id.userId, posted]);


 const handleClick = async(e)=>{
 
    if(desc.current.value){
      const newPost = {
         userId : state.user._id,
         description: desc.current.value,
         
      }
   
    try {
       await axiosInstance.post("/posts", newPost);
       desc.current.value = "";
       setPosted(true);
  
    } catch (error) {
       console.log(error)
    }
   }else{
     e.stopPropagation();
   }
 }

  return <div className="middlebar">
           {own ? null : 
           <div className="middle-top">
           <input type="text" placeholder="what's on your mind today?..." ref={desc}/>
           <div className="share">
             <div className="share-div">
             <div className="picture">
                <ImageIcon />
                <label for="image">Image</label>
                <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg" ref={image} />
             </div>
             <div className="picture">
                <VideocamIcon />
                <label for="video">Video</label>
                <input type="file" id="video" name="video"  />
             </div>
             <div className="picture">
                <DuoIcon />
                <label for="gif">GIF</label>
                <input type="file" id="gif" name="gif"  />
             </div>
             </div>
             <button type="button" onClick={handleClick}>POST</button>
           </div>
         </div>
           }
         {posts.map((item)=>{
            return(
               <Feed key={item._id} info={item} />
            )
         })}
         </div>;
}
