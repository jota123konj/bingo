import React from 'react';
import './ActiveTicket.css'

const ActiveTicket = (props) => {
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
            <div className="bidWrapper">
                <input type="number" max = '100' min = '1' step = '0.05' placeholder = 'Bid 1-100'  className="bidAmount" />
                <button onClick = {props.clickHandler} className = 'bid'>BID</button>
            </div>
        </div>
    )
} 
export default ActiveTicket;