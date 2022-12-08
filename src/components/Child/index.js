import React from 'react'
import "./index.css"

function Child({child}){
    return(
        <div className='child-preview'>
            <h1>{child.first_name}</h1>
            <img src={child.profile_picture} alt="baby"/>
            <button>View Child</button>
        </div>
    )
}

export default Child