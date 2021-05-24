import React from 'react';
import './CurrentTickets.css';

const CurrentTickets = (props) => {
    let tickets =  []
    let a = null
    const generateTicket = () => {
        ticketSplitParse();
        let ticketElement = [];
        for (let i = 0; i < tickets.length; i++) {
            ticketElement = [];
            tickets[i].forEach((element, index) => {
                ticketElement.push(
                    <div key = {index} className = 'ticketNumber'>
                        <p className = {Color(element)}>{element}</p>
                    </div>
                )
            });
            console.log(ticketElement);
            tickets[i] = <div className = 'row'>{ticketElement}</div>;
        }
    }
    
    let ticketSplitParse = () => {
        let tempArray = [];
        for (let i = 0; i < props.tickets.length; i++) {
            tempArray = props.tickets[i];
            tempArray = tempArray.split(",");
            for (let index = 0; index < tempArray.length; index++) {
                tempArray[index] = parseInt(tempArray[index]);
            }
            tickets[i] = tempArray;
        }
    }

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
    generateTicket();
    return(
        <div className = 'currentTickets'>
            {tickets}
        </div>
    )
}
export default CurrentTickets;