import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ParentProfile from "./components/ParentProfile";
import SignIn from './components/SignIn'
import Header from "./components/Header";
import ChildProfile from './components/ChildProfile'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route path='' element={<App/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/profile' element={<ParentProfile/>}/>
        <Route path='/child' element={<ChildProfile/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
