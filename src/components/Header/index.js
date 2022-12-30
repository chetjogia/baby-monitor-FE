import React, { useState } from "react";
import "./index.css";
import { signInWithGoogle } from "../../firebase.js";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/index.js";

function Header() {
  const navigate = useNavigate();
  const { currentUser,logout } = useAuth();
  const [hidden, setHidden] = useState(false);

  async function signIn() {
    const result = await signInWithGoogle();
    let token = await result.user.getIdToken();
    if (result) {


      setHidden(true);
      navigate("/profile");
      await fetch(
        `http://localhost:3000/api/babymonitor/parentlogin/`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          method:"POST",
          body: JSON.stringify(result.user)
        });
    } else {
      navigate("/");
    }
  }

  async function signOut() {
    await logout();
    setHidden(false);
  }

  return (
    <div className="header">
      <div className="app-name">
        <img src="" alt="logo"></img>
        <h1>Baby Monitor</h1>
      </div>
      <nav>
        <ul>
          <Link to="/profile">Dashboard</Link>
          <Link hidden={hidden} onClick={signIn}>
            Log In
          </Link>
          <Link hidden={!hidden} onClick={signOut}>
            Log Out
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
