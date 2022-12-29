import React from "react";
import jwt_decode from "jwt-decode";
import { signInWithGoogle } from "../../firebase.js";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext/index.js";
import { Link } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentUser, logout } = useAuth();

  async function signIn() {
    const result = await signInWithGoogle();
    if (result) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }

    await fetch(`http://localhost:3000/api/babymonitor/parentlogin/${currentUser.uid}`)


  }

  async function signOut() {
    await logout();
  }
  console.log(currentUser);

  return (
    <div className="App">
      <div>
        <div className="welcome-bar">
          <h1>Welcome to Baby Monitor</h1>
          <div className="gooogle-button-div">
            <button onClick={signIn}>Sign In With Google</button>
            <button onClick={signOut}>Sign Out</button>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
