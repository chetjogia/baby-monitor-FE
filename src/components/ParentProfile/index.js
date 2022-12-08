import React, { useEffect, useState } from "react";
import "./index.css";
import ChildList from '../ChildList'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [childrenOfParent, setChildrenOfParent] = useState(null);

  useEffect(() => {
    getParentAndChildData();
  }, []);

  async function getParentAndChildData() {
    //fetch request to obtain data for individual parent who's logged in (atm, hard coded for parent with id 1)
    //TODO change the parent based on who's logged in;
    const parentResponse = await fetch(
      "http://localhost:3000/api/babymonitor/parent/1"
    );
    const parentData = await parentResponse.json();
    setParent(parentData.payload[0]);

    //fetch request to obtain data for the children belonging to the parent who has logged in
    //Parent ID currently hardcoded as above
    const childrenOfParentResponse = await fetch(
      "http://localhost:3000/api/babymonitor/parentchildren/1"
    );
    const childrenOfParentData = await childrenOfParentResponse.json();
    setChildrenOfParent(childrenOfParentData.payload);

    setIsLoading(false);
  }

  console.log(childrenOfParent)

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
            <ChildList childrenOfParent={childrenOfParent}/>
        </div>
      </div>
    );
  }
}
