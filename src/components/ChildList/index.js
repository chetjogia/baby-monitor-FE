import React from 'react'
import Child from '../Child'
import './index.css'
import AddChildModal from '../AddChildModal'

function ChildList({childrenOfParent, setChildrenOfParent}){
    
    return(
        <div className="children-container">
            {childrenOfParent.map((child) => {return <Child key={child.children_id} child={child} />})}
            <div className="add-baby">
                <AddChildModal childrenOfParent={childrenOfParent} setChildrenOfParent={setChildrenOfParent}/>
            </div>
        </div>
    )
}

export default ChildList