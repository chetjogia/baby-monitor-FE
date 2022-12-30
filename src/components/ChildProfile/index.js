import React, { useEffect } from "react";
import "./index.css";
import {useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../Modal";

function ChildProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState(null);
  const location = useLocation()

  useEffect(() => {
    getChildData();
  }, []);
  console.log(location)
  async function getChildData() {
    //fetch request to obtain data for individual child who's been clicked in (atm, hard coded for child with id 1)
    const childResponse = await fetch(
      `http://localhost:3000/api/babymonitor/children/${location.state?.id}`
    );
    const childData = await childResponse.json();
    setChild(childData.payload[0]);
    setIsLoading(false);
  }
  
  console.log(child);

  if (isLoading) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  } else {
    let dob = new Date(child.dob);

    return (
      <div className="child-container">
        <div className="child-info-container">
          <img src={child.profile_picture} alt="profile" />
          <div className="text-container">
            <h3>First Name: {child.first_name}</h3>
            <h3>Last Name: {child.last_name}</h3>
            <h3>DOB: {dob.toDateString()}</h3>
            <h3>Gender: {child.gender}</h3>
          </div>
        </div>
        <div className="button-container">
          <Modal/>
          <button className="baby-stat-button">Sleeping</button>
          <button className="baby-stat-button">Nappies</button>
          <button className="baby-stat-button">Weight</button>
        </div>
      </div>
    );
  }
}

export default ChildProfile;
