import React, { useContext, useEffect, useState } from 'react';
import "./profile.css"
import Navbar from '../../components/navbar/navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import ProfileInfo from '../../components/profile_info/ProfileInfo';
import { useParams } from 'react-router';
import {axiosInstance} from "../../config";
import {UserContext} from "../../context/context"

export default function Profile() {
  const [isOwn, setIsOwn] = useState(true);
  const {state} = useContext(UserContext);
  const [followers, setFollowers] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  const id = useParams();
  const [userData, setUserData] = useState({});

  
  useEffect(()=>{
    window.scrollTo(0, 0);
    window.scroll({behavior: "smooth"});
    if(id.userId === state.user._id){
      setIsOwn(false);
    }else{
      setIsOwn(true);
    }

    const fetchUser = async ()=>{
        const user = await axiosInstance.get(`/users?userId=${id.userId}`);
        setUserData(user.data);
        setFollowers({followers: user.data.followers.length, following: user.data.following.length}) ;

        if(user.data._id !== state.user._id && user.data.followers.includes(state.user._id)){
          setIsFollowed(true);
        }else{
          setIsFollowed(false);
        }
    }
    fetchUser();

   
  }, [ state.user._id, id.userId]);
   
  
   
    return <div className="profile">
         <Navbar />
      <div className="body">
          <Leftbar />
          <ProfileInfo user={userData} own={isOwn} followers={followers} followed={isFollowed}/>
      </div>
  </div>;
  
}
