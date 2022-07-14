import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./profile-info.css"
import Middlebar from '../middlebar/Middlebar';
import {axiosInstance} from "../../config";
import { UserContext } from '../../context/context';
const photos = process.env.REACT_APP_PUBLIC_FOLDER;



export default function ProfileInfo({user, own, followers, followed}) {
  const {state} = useContext(UserContext);
   const [isFollowed, setIsFollowed] = useState("");
   const [follows, setFollows] = useState({});
   const [follower, setFollower] = useState([]);
   const [followings, setFollowings] = useState([]);
   const [followerBtn, setFollowerBtn] = useState(false);
   const [followingBtn, setFollowingBtn] = useState(false);

   useEffect(()=>{
     setFollows({...followers});
     setIsFollowed(followed);

     const fetchFriends = async () => {
       let followerInfo = [];
       let followingInfo = [];
       for(let k = 0; k < user.followers.length; k++){
        let info = await axiosInstance.get(`/users?userId=${user.followers[k]}`);
        let infoObj = {
            userId : info.data._id,
            profile : info.data.profilepicture,
            username : info.data.username
        }
        followerInfo.push(infoObj);
   
       }
       for(let k = 0; k < user.following.length; k++){
        let info = await axiosInstance.get(`/users?userId=${user.following[k]}`);
        let infoObj = {
            userId : info.data._id,
            profile : info.data.profilepicture,
            username : info.data.username
        }
        followingInfo.push(infoObj);
        
       }

       setFollower(followerInfo);
       setFollowings(followingInfo);
     }
     
     fetchFriends();

    
   }, [followers, followed, user]);

   
   
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

   const handleFollower = ()=>{
    setFollowingBtn(false);
    setFollowerBtn(!followerBtn);
   }

   const handleFollowing = ()=>{
    setFollowerBtn(false);
    setFollowingBtn(!followingBtn);
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
                <div className="about-sec">
                <h4>About...</h4>
                <div className="about-info"></div>
                </div>
                <div className="followers-sec" onClick={handleFollower}>
                <h4>{ follows.followers} Followers</h4>
                <div className={followerBtn ? `followers-info active` : `followers-info`}>
                {follower.map((item, index)=>{
                    return (
                      <div className="person" key={index}>
                      <img src={photos +  item.profile} alt="" srcset="" />
                      <Link to={`/profile/${item.userId}`} className="follow-link">
                      <p>{item.username}</p>
                      </Link>
                      
                    </div>
                    )
                  })}
                </div>
                </div>
                <div className="following-sec" onClick={handleFollowing}>
                <h4>{ follows.following} Following</h4>
                <div className={followingBtn ? `following-info active` : `following-info`}>
                  {followings.map((item, index)=>{
                    return (
                      <div className="person" key={index}>
                      <img src={photos +  item.profile} alt="" srcset="" />
                      <Link to={`/profile/${item.userId}`} className="follow-link">
                      <p>{item.username}</p>
                      </Link>
                    </div>
                    )
                  })}
                 
                </div>
                </div>
        
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
