import React from 'react'
import './NumberBox.css';

const NumberBox = (props) => {
    const Color = (number) => {
        switch (number%8){
            case 1:
                return "red";
            case 2:
                return "green";
            case 3:
                return "blue";
            case 4:
                return "purple";
            case 5:
                return "brown";
            case 6:
                return "yellow";
            case 7:
                return "orange";
            default:
                return "black";
        }
    }
    return(
        <div className = {Color(props.children)}>
            <p>{props.children}</p>
        </div>
    )
}
export default NumberBox;