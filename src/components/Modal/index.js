import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Table from "../Table";
import { useAuth } from "../../contexts/AuthContext";

function Modal() {
  const [modal, setModal] = useState(false);
  const [childData, setChildData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const {currentUser} = useAuth()
  
  useEffect(() => {
    
    getData();
  }, []);
  async function getData() {
    let token = await currentUser.getIdToken()
    const response = await fetch(
      
      "http://localhost:3000/api/babymonitor/feeding",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }

    );
    const data = await response.json();
    setChildData(data.payload);
    setIsLoading(false);
    console.log("check", data.payload);
    let graph = await data.payload.map((element) => {
      let date = new Date(element.feeding_time);
      return {
        time: date.toDateString(),
        amount: Number(element.quantity),
        type: element.type,
        comment: element.comment,
      };
    });
    setGraphData(graph);
  }
  function toggleModal() {
    setModal(!modal);
  }


  async function handleClick(dataObject) {
    console.log(dataObject)

    let newArray = [...graphData]
    console.log("NEW", newArray)
    console.log("GRAPH", graphData)
 

    let token = await currentUser.getIdToken();
    console.log(token)
    fetch("http://localhost:3000/api/babymonitor/feeding/1", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(dataObject),
    });
    dataObject.time = new Date(dataObject.time).toLocaleDateString('en-gb', {weekday: 'short', month:'short', day:'2-digit', year:'numeric'})
    newArray.push(dataObject)
    setGraphData(newArray)
  }
  

  let heading = ["Time", "Amount (ml)", "Type", "Comment"];

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
                <h1>Feeding</h1>
                <Table handleClick={handleClick} childData={childData} heading={heading} body={graphData} />
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default Modal;
