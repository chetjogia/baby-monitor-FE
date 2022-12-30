import React from "react";
import { signInWithGoogle } from "../../firebase.js";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/index.js";

function SignIn() {

  return (
    <div className="App">
      <div>
        <div className="welcome-bar">
          <h1>Welcome to Baby Monitor</h1>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
