import "./App.css";
import Welcome from "../Welcome";
import Header from "../Header";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {signInWithGoogle} from '../../firebase.js'

function App() {
  return (
    <div className="App">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default App;
