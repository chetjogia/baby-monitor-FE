import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Table from "../Table";

function Modal() {
  const [modal, setModal] = useState(false);
  const [childData, setChildData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3000/api/babymonitor/feeding"
      );
      const data = await response.json();
      setChildData(data.payload);
      setIsLoading(false);
      console.log(data.payload);
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
    getData();
  }, []);

  function toggleModal() {
    setModal(!modal);
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
                <Table heading={heading} body={graphData} />
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default Modal;
