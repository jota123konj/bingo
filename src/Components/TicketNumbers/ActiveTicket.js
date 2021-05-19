import React, {useState} from 'react';
import './ActiveTicket.css'

const ActiveTicket = (props) => {
    useState
    let ticketNumbersArray = [];
    props.children.forEach(element => {
        ticketNumbersArray.push(<div className = 'ticketNumber'>{element}</div>);
    });
    return(
        <div className = 'activeTicket'>
            <div className = 'ticket'>{ticketNumbersArray}</div>
            <button onClick = {props.clickHandler} className = 'submit'>Upload ticket</button>
        </div>
    )
} 
export default ActiveTicket;