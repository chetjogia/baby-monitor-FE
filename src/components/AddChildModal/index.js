import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import "./index.css";
import Table from "../Table";
import { useAuth } from "../../contexts/AuthContext";
import { parentContext } from "../ParentProfile";

function AddChildModal({childrenOfParent,setChildrenOfParent}) {
  const [modal, setModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const child_fname = useRef(null);
  const child_lname = useRef(null);
  const child_gender = useRef(null);
  const child_dob = useRef(null);
  const parent = useContext(parentContext);
  const { currentUser } = useAuth();

  function toggleModal() {
    setModal(!modal);
  }

  async function handleSubmit(event) {
    let parent_id = parent.parent_id;
    let first_name = child_fname.current.value;
    let last_name = child_lname.current.value;
    let gender = child_gender.current.value;
    let dob = new Date(child_dob.current.value);
    let childToAdd = {parent_id:parent_id, dob:dob, gender:gender, first_name:first_name, last_name:last_name, profile_picture:"https://images.rapgenius.com/0db078b7f57980a110d9214ce4935f5b.300x300x1.png"}
    let token = await currentUser.getIdToken();
    console.log(token)
    fetch("http://localhost:3000/api/babymonitor/children", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(childToAdd),
  
    });
    console.log("children of parent", childrenOfParent)
    let newArray = childrenOfParent.map((element)=>{return {...element}})
    newArray.push(childToAdd)

    setChildrenOfParent(newArray)
  }

  console.log(childrenOfParent)
  return (
    <>
      <button onClick={toggleModal} className="add-child-button">
        Add New Child
      </button>

      {modal &&
        (isloading ? (
          <div className="modal">
            <div className="modal-content">
              <h2>...Loading</h2>
            </div>
          </div>
        ) : (
          <>
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <form className="add-child-form" onSubmit={handleSubmit}>
                  <label>Child First Name</label>
                  <input ref={child_fname} type="text" id="fname"></input>
                  <label>Child Last Name</label>
                  <input ref={child_lname} type="text" id="lname"></input>
                  <label>Gender</label>
                  <input ref={child_gender} type="text" id="gender"></input>
                  <label>DOB</label>
                  <input ref={child_dob} type="date" id="dob"></input>
                </form>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default AddChildModal;
