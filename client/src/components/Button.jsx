
import React from "react";

export default function Button(props){
    // 
    return <button 
              type={props.type} 
              onSubmit={props.onSubmit} 
              onClick={props.onClick} 
              className={props.className}
            >
              {props.name}
            </button>
}