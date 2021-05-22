import React from 'react';
import './CurrentTickets.css';

const CurrentTickets = (props) => {
    let tickets =  []
    props.tickets.forEach((element, index) => {
        tickets.push(
            <div key = {index} className = 'ticketNumber'>
                <p className = {Color}>{element}</p>
            </div>
        )
    });
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
        <div className = 'currentTickets'>
            {tickets}
        </div>
    )
}
export default CurrentTickets;