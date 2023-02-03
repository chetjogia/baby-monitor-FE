import React, { useRef } from "react";
import TableRow from "../TableRow";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";

function Table(props) {
  let heading = props.heading;
  let body = props.body;
  const dateRef = useRef();
  const amount = useRef();
  const type = useRef();
  const comment = useRef();



  return (
    <table className="table">
      <thead>
        <tr>
          {heading.map((head) => (
            <th className="cell">{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="">
            <input
              ref={dateRef}
              type="date"
              name="time"
              className="date-container"
            ></input>
          </td>
          <td>
            <input ref={amount} type="text" name="amount" className=""></input>
          </td>
          <td>
            <input ref={type} type="text" name="type" className=""></input>
          </td>
          <td>
            <input
              ref={comment}
              type="text"
              name="comment"
              className=""
            ></input>
          </td>
          <td className="add-data-container">
            <button
              className="add-data"
              onClick={() => {
                return props.handleClick({
                  time: dateRef.current.value,
                  amount: amount.current.value,
                  type: type.current.value,
                  comment: comment.current.value,
                });
              }}
            >
              +
            </button>
          </td>
        </tr>
        {body.map((row) => (
          <TableRow row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
