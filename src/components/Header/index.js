import React from "react";
import './index.css'

function Header() {
  return (
    <div className="header">
      <div className="app-name">
        <img src="" alt="logo"></img>
        <h1>Baby Monitor</h1>
      </div>
      <nav>
        <ul>
          <li className="Home">Home</li>
          <li className="About">About</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
