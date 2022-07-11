/* eslint-disable */
import React, { useContext } from "react";
import Profile  from "./pages/profile/profile"
import Timeline from "./pages/timeline/timeline"
import Loginreg from "./pages/loginreg/Loginreg";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {UserContext} from "./context/context"


function App() {
  const {state} = useContext(UserContext);
  return (
     <Router>
         <Route exact path="/">
         { state.user ? <Timeline /> : <Loginreg /> }
         </Route>
         <Route path="/profile/:userId">
         <Profile />
         </Route> 
     </Router>
  )
}

export default App;
