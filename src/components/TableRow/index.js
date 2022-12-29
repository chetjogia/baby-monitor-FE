import React from 'react'
import './index.css'

function TableRow(props){
    let row = props.row;
    return (
        <tr >
            <td className='cell'>{row.time}</td>
            <td className='cell'>{row.amount}</td>
            <td className='cell'>{row.type}</td>
            <td className='cell'>{row.comment}</td>
        </tr>
    )
}


export default TableRow