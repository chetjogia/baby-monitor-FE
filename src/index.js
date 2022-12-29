import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ParentProfile from "./components/ParentProfile";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import ChildProfile from "./components/ChildProfile";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <AuthProvider>
        <Routes>
          <Route path="" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<PrivateRoute><ParentProfile /></PrivateRoute>} />
          <Route path="/child" element={<ChildProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
