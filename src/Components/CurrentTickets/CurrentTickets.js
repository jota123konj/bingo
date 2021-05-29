import React from 'react';
import './CurrentTickets.css';

const CurrentTickets = (props) => {
    let ticketsReady =  [];
    let ticketsRunning = [];

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
    
    let ticketSplitParse = (ticketsArray) => {
        let tempArray = [];
        tempArray = ticketsArray.split(",");
        for (let index = 0; index < tempArray.length; index++) {
            tempArray[index] = parseInt(tempArray[index]);
        }
        return tempArray;
    }

    const generateTicket = (ticket) => {
        let ticketNumbers = ticketSplitParse(ticket.selectedNum);
        let stake = ticket.stake;
        let ticketNumbersElement = [];
        ticketNumbers.forEach((element, index) => {
            ticketNumbersElement.push(
                <div key = {index} className = 'ticketNumber'>
                    <p className = {Color(element)}>{element}</p>
                </div>
            )
        })
        return <div className = 'row'>
            {ticketNumbersElement}
            <div className="stake">Stake:{stake}€</div>
        </div>

    }
    
    const generateAllTickets = (objectsArray) => {
        let tempArray = [];
        objectsArray.forEach((element) => {
            tempArray.push(generateTicket(element));
        })
        return tempArray
    }
    const generateReady = () => {
        ticketsReady = [];
        ticketsReady = generateAllTickets(props.ticketsReady);
    }
    const generateRunning = () => {
        ticketsRunning = [];        
        ticketsRunning = generateAllTickets(props.ticketsRunning);
    }
    generateReady();
    generateRunning();
    return(
        <div className = 'currentTickets'>
            <h2 className = 'ticketsTitle'>Tickets for current round</h2>
            {ticketsRunning}
            <h2 className = 'ticketsTitle'>Tickets for next round</h2>
            {ticketsReady}
        </div>
    )
}
export default CurrentTickets;