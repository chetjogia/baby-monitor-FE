import React from "react";
import jwt_decode from "jwt-decode";
import { signInWithGoogle } from "../../firebase.js";
import "./index.css";
import {useLocation} from 'react-router-dom'
 
function SignIn() {
  const location = useLocation()

  console.log(location)
  return (
    <div className="App">
      <div>
        <div className="welcome-bar">
          <h1>Welcome to Baby Monitor</h1>
          <div className="gooogle-button-div">
            <button onClick={signInWithGoogle}>Sign In With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
