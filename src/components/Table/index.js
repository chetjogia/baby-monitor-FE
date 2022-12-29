import React from 'react'
import TableRow from '../TableRow';
import './index.css'

function Table(props){
    let heading = props.heading;
        let body = props.body;

        return (
            <table className='table' style={{ width: 500 }}>
                <thead>
                    <tr >
                        {heading.map(head => <th className='cell'>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map(row => <TableRow row={row} />)}
                </tbody>
            </table>
        )
}


export default Table