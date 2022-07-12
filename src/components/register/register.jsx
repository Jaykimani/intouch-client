import React, { useContext } from 'react';
import { useRef } from 'react';
import "./register.css"
import {axiosInstance} from "../../config";
import { UserContext } from '../../context/context';

export default function Register() {
  const {dispatch} = useContext(UserContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handlesubmit = async(e) =>{
    e.preventDefault();
    if(password.current.value === confirmPassword.current.value){
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
       
      }
      dispatch({type: "REGISTERED"})
      try {
        await axiosInstance.post("/auth/register", user);
        
      } catch (err) {
        console.log(err)
      }
    }else{
      confirmPassword.current.setCustomValidity("Passwords don't match!")

    }
    
  }

  return <div className="register-div">
  <form className="register-form" onSubmit={handlesubmit}>
  <input type="text" placeholder="Username" ref={username}/>
  <input type="email" placeholder="Email" ref={email}/>
  <input type="password" placeholder="Password" ref={password}/>
  <input type="password" placeholder="Confirm Password" ref={confirmPassword}/>
 
  <button type="submit">REGISTER</button>
  </form>

</div>;
}
