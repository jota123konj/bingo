import React, {useState} from 'react';
import './ActiveTicket.css'

const ActiveTicket = (props) => {
    const [ticketNumbers, setTicketNumbers] = useState([]);
    let ticketNumbersArray = []
    const generateNumbers = () => {
        console.log('generate nums');
        for(let i = 0; i < 6; i++) {
            if(props.children[i]){
                ticketNumbersArray.push(<div key = {i} className = 'ticketNumber'>
                                            <p className = {Color(props.children[i])}>{props.children[i]}</p>
                                        </div>);
            }else{
                ticketNumbersArray.push(<div key = {i} className = 'ticketNumber'></div>)
            }
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

    generateNumbers();

    return(
        <div className = 'activeTicket'>
            <div className = 'ticket'>{ticketNumbersArray}</div>
            <button onClick = {props.clickHandler} className = 'submit'>BID</button>
        </div>
    )
} 
export default ActiveTicket;