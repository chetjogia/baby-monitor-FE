import React from "react";
import "./index.css";
import { useEffect } from "react";

function Welcome({ handleCredentialResponse }) {


  return (
    
      <div className="welcome-container">
        <h1>Welcome To Baby Monitor</h1>
        <div id="google-button"></div>
      </div>
    
  );
}

export default Welcome;
