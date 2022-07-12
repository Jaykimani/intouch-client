import React ,{useContext, useRef} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios';
import "./login.css"
import { UserContext } from '../../context/context';
import {axiosInstance} from '../../config'

export default function Login() {
  const {state, dispatch} =useContext(UserContext);
  const email = useRef();
  const password = useRef()

  const handleSubmit = async(e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN"})
    const user = {
       email: email.current.value,
       password: password.current.value
    }
    try {
      const loggedUser = await axiosInstance.post("/auth/login", user);  
     dispatch({type: "LOGIN-SUCCEED", payload: loggedUser.data});
     
    } catch (err) {
      dispatch({type: "LOGIN-FAILURE"})
    }
  }

  const handleClick = ()=>{
    dispatch({type: "REGISTER"});
  }
  return <div className="login-div">
      <form className="login-form" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" ref={email}/>
      <input type="password" placeholder="Password" ref={password}/>
      <p>Forgot Password?..</p>
      <button type="submit">{state.fetching ? <CircularProgress style={{color: "white", width: "20px", height: "20px"}} /> : "LOGIN"}</button>
      </form>

      <p onClick={handleClick}>REGISTER?...</p>
  </div>;
}
