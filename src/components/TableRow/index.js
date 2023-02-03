import React from 'react'
import './index.css'

function TableRow(props){
    let row = props.row;
    return (
        <tr >
            <td className='cell'>{new Date(row.time).toLocaleDateString('en-gb', {weekday: 'short', month:'short', day:'2-digit', year:'numeric'})}</td>
            <td className='cell'>{row.amount}</td>
            <td className='cell'>{row.type}</td>
            <td className='cell'>{row.comment}</td>
        </tr>
    )
}


export default TableRow