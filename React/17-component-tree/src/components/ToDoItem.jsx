import React, {useState} from "react";

// This component is stateless
function ToDoItem(props) {

    function handleClick(event) {
        
    }

    return (
        <div onClick={() => {
            props.onChecked(props.id)
        }}>
            <li>
                {props.text}
            </li>
        </div>
    )
};

export default ToDoItem;