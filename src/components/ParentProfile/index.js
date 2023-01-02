import React, { createContext, useContext, useEffect, useState } from "react";
import "./index.css";
import ChildList from "../ChildList";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
export const parentContext = createContext();

export default function Signup() {
  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [childrenOfParent, setChildrenOfParent] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    getParentAndChildData();
  }, []);

  async function getParentAndChildData() {
    let token = await currentUser.getIdToken();
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
          <parentContext.Provider value={parent}>
            <ChildList childrenOfParent={childrenOfParent} setChildrenOfParent={setChildrenOfParent} />
          </parentContext.Provider>
        </div>
      </div>
    );
  }
}
