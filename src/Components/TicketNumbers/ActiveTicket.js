import React from 'react';
import './ActiveTicket.css'

const ActiveTicket = (props) => {
    let ticketNumbersArray = []
    let bidCheck;
    const bidChecker = () => {
        let bidString = String(props.bid);
        let bidDecimalString = bidString.split('.')[1]
        if (bidString.includes('.') && bidString.split('.')[1].length > 2) {
            bidCheck = false;
        }else if(bidString.includes('.') && bidString.split('.')[1].length === 2){
            if(bidDecimalString[1] === '5' || bidDecimalString[1] === '0'){
                bidCheck = true;
            }else{
                bidCheck = false;
            }

        }else{
            bidCheck = true;
        }
    }
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
    bidChecker();
    //value={props.bid}
    console.log("ActiveTicket render!");
    return(
        <div className = 'activeTicket'>
            <div className = 'ticket'>{ticketNumbersArray}</div>
            <form onChange = {event => props.bidAmountCallback(event.target.value)} className="bidWrapper">
                <input type="number" max = '100' min = '1' step = '0.05' placeholder = 'Bid 1-100' value={props.bid} className="bidAmount" />
                {bidCheck === true && props.bid >= 1 && props.bid <= 100 && props.children.length === 6 && sessionStorage.getItem("logged-in")==="true" ? 
                    <button onClick = {props.clickHandler} className = 'bid'>BID</button>:
                    <button disabled className = 'bidDisabled'>BID</button> 
                }
            </form>
        </div>
    )
} 
export default ActiveTicket;