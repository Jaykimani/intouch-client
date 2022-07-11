import "./rightbar.css"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../context/context';
import React, { useContext, useEffect, useState } from "react";
const photos = process.env.REACT_APP_PUBLIC_FOLDER;


export default function Rightbar() {
 const navigate = useHistory();
 const {state} = useContext(UserContext);
 const {user} = state;
 const [onlines, setOnlines] = useState([])

 useEffect(()=>{
   const onlines = [...user.following, ...user.followers];
   const fetchOnlines = async ()=>{
     const arr = await Promise.all(
       onlines.map((item)=>{
         const user = axios.get(`/users?userId=${item}`)
         return user
       })
     );
     setOnlines(arr)
   }

   fetchOnlines();
 }, [user]);

 

const handleClick = async (e)=>{
  const username = e.currentTarget.innerHTML;
  try {
    const user = await axios.get(`/users?username=${username}`);
    const userData = user.data;
    navigate.push(`/profile/${userData._id}`);
  } catch (error) {
    console.log(error)
  }
}


  return <div className="rightbar" >
       <div className="rightbar-online">
        {onlines.map((item, index)=>{
          const userData= item.data;

          return(
         <div className="person-online" key={index}>
           
           <div className="online-img">
           <img src={photos + userData.profilepicture} alt="" />
           </div>
           <p onClick={handleClick}>{userData.username}</p>  
        </div>
          )
          
        })}
         
         
       </div>
       <div className="divider"></div>
       <div className="advert-img">
       <img src="/assets/posts/post13.jpg" alt="" />
       </div>
  </div>;
}
