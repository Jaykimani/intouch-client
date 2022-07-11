import React, { useContext } from 'react';
import "./loginreg.css";
import Register from '../../components/register/register';
import Login from '../../components/login/login';
import {UserContext} from "../../context/context"

export default function Loginreg() {
  const {state} = useContext(UserContext);


  return <div className="loginbg">
      <div className="loginimg">
        <img src="/assets/loginreg.jpg" alt="" srcset="" />
        <h1>inTouch</h1>
      </div>
      <div className="login-section">
        {state.registered ? <Login /> : <Register />}
      </div>
  </div>
}
