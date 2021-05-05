import React from 'react';
import './Quote.css';

const Quote = (props) =>{

    return(
        <div className = "quote">
            <div className="quoteNumber">
                {props.children}
            </div>
        </div>
    )
}
export default Quote;