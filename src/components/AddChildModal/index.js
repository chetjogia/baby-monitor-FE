import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Table from "../Table";
import { useAuth } from "../../contexts/AuthContext";

function AddChildModal() {
  const [modal, setModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);



  function toggleModal() {
    setModal(!modal);
  }


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
               <form className="add-child-form">
                    <label>Child First Name</label>
                    <input type='text'  id="fname"></input>
                    <label>Child Last Name</label>
                    <input type='text'  id="lname"></input>
                    <label>Gender</label>
                    <input type='text'  id="gender"></input>
                    <label>DOB</label>
                    <input type='date'  id="dob"></input>
               </form>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default AddChildModal;
