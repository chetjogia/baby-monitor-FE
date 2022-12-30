import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

function Child({child}){
    return(
        <div className='child-preview'>
            <h1>{child.first_name}</h1>
            <img src={child.profile_picture} alt="baby"/>
            <Link to="/child" state={{id:child.children_id}}><button>View Child</button></Link>
        </div>
    )
}

export default Child