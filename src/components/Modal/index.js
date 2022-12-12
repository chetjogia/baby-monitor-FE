import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Modal() {
  const [modal, setModal] = useState(false);
  const [childData, setChildData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState([])
  

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3000/api/babymonitor/feeding"
      );
      const data = await response.json();
      setChildData(data.payload);
      setIsLoading(false);
      let graph = await data.payload.map(element=>{return {"time": element.feeding_time, y: Number(element.quantity)}})
      setGraphData(graph)
      console.log(graph)
     
    }
    getData();
  }, []);

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
                <button onClick={toggleModal}>Close</button>
                <h1 className="title">Feeding Data</h1>
                
                <LineChart
                  width={1000}
                  height={250}
                  data={graphData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" />
                </LineChart>
              </div>
            </div>
          </>
        ))}
    </>
  );
}

export default Modal;
