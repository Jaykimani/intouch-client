import React, { useContext, useEffect, useState } from 'react';
import "./profile-info.css"
import Middlebar from '../middlebar/Middlebar';
import {axiosInstance} from "../../config";
import { UserContext } from '../../context/context';
const photos = process.env.REACT_APP_PUBLIC_FOLDER;



export default function ProfileInfo({user, own, followers, followed}) {
  const {state} = useContext(UserContext);
   const [isFollowed, setIsFollowed] = useState("");
   const [follows, setFollows] = useState({});

   useEffect(()=>{
     setFollows({...followers});
     setIsFollowed(followed);
   }, [followers, followed]);

   

  
   const handleClick = async ()=>{
        if(isFollowed === false){
          try{
            await axiosInstance.put(`/users/${user._id}/follow`, state.user);
            setFollows({...follows, followers: follows.followers + 1})
            setIsFollowed(true);
          }catch(err){
            console.log(err)
          }
        }else{
          try {
            await axiosInstance.put(`/users/${user._id}/unfollow`, state.user);
            setFollows({...follows, followers: follows.followers - 1})
            setIsFollowed(false);

          } catch (error) {
console.log(error)
    
          }
        }
  
    
   }
  
  return <div className="profile-info">
          <div className="cover-img">
            <img src={photos + user.coverpicture} alt="" />
            <div className="prof-img">
              <img src={photos + user.profilepicture} alt="" />
            </div>
          </div>
          <div className="prof-name">
              <h2>{user.username}</h2>
              <p>{user.description}</p>
              <div className="prof-stats">
                <h4>About...</h4>
                <h4>{ follows.followers} Followers</h4>
                <h4>{ follows.following} Following</h4>
                {own ? <button onClick={handleClick}>{isFollowed ? "UNFOLLOW -" : "FOLLOW +"}</button> : null}
              </div>
          </div>
          <div className="profile-posts">
           <Middlebar own={own} otherUser={user}/>
           <div className="profile-right-bar">
             <div className="about-div">
               <p>CITY: NAIROBI</p>
               <p>COUNTRY: KENYA</p>
               <p>AGE: 36</p>
               <p>RELATIONSHIP: Single</p>
             </div>
             <div className="divider"></div>
             <div className="prof-advert">
               <img src="/assets/adds/add1.jpg" alt="" />
             </div>
           </div>
          </div>

         </div>;
}
