import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

function Modal() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/api/babymonitor/feeding");
      const data = await response.json();
      setData(data.payload);
      setIsLoading(false);
    }
    getData();
  },[]);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <>
      <button onClick={toggleModal} className="baby-stat-button">
        Feeding
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
                {console.log("DATA", data)}
                <button onClick={toggleModal}>Close</button>
                <h1 className="title">{data.payload[0].type}</h1>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default Modal;
