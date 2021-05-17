import React from 'react';
import './ActiveTicket.css'

const ActiveTicket = (props) => {
    return(
        <div className = 'activeTicket'>
            {props.children}
        </div>
    )
} 
export default ActiveTicket;