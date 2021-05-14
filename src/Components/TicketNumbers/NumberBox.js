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
    if(props.added === true){
        return(
            <div onClick = {props.clickHandler} className = "numberBox">
                <div className="passive">
                    <p className = {Color(props.keys)}>{props.number}</p>
                </div>
            </div>
            
        )
    }
    else{
        return(
            <div onClick = {props.clickHandler} className = "numberBox">
                <div className = {Color(props.keys)}>
                    <p className = {props.added.toString()}>{props.number}</p>
                </div>
            </div>
        )
    }
    
}
export default NumberBox;