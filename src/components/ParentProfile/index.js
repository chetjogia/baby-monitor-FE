import React, { useEffect, useState } from "react";
import "./index.css";
import ChildList from "../ChildList";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [childrenOfParent, setChildrenOfParent] = useState(null);
  const [token, setToken] = useState()

  const { currentUser } = useAuth();

  useEffect(() => {
   /*  fetchData() */
    getParentAndChildData();
  }, []);

  
/* 
  async function fetchData() {

    const response = await fetch(
      `http://localhost:3000/api/babymonitor/parent/`
    );
    const data = await response.json();
    console.log(data);
  } */

  async function getParentAndChildData() {
    let token = await currentUser.getIdToken()
    //fetch request to obtain data for individual parent who's logged in (atm, hard coded for parent with id 1)
    //TODO change the parent based on who's logged in;
    const parentResponse = await fetch(
      `http://localhost:3000/api/babymonitor/parent/${currentUser.uid}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const parentData = await parentResponse.json();
    setParent(parentData.payload[0]);
    console.log("PARENT", parentData)
    //fetch request to obtain data for the children belonging to the parent who has logged in
    //Parent ID currently hardcoded as above
    const childrenOfParentResponse = await fetch(
      `http://localhost:3000/api/babymonitor/parentchildren/${parentData.payload[0].parent_id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const childrenOfParentData = await childrenOfParentResponse.json();
    setChildrenOfParent(childrenOfParentData.payload);

    setIsLoading(false);
  }

  console.log(childrenOfParent);

  if (isLoading) {
    return <h1>...Loading</h1>;
  } else {
    return (
      <div>
        <div className="parent-info-container">
          <div className="profile-image">
            <img src={parent.profile_picture} alt="parent" />
          </div>
          <div className="greeting">
            <h1>Hi {parent.first_name}! How are you today?</h1>
            <q>Skin to skin is an excellent way to connect with your baby</q>
          </div>
        </div>
        <div className="little-ones-page-break">
          <h1>Little Ones:</h1>
        </div>
        <div>
          <ChildList childrenOfParent={childrenOfParent} />
        </div>
      </div>
    );
  }
}
