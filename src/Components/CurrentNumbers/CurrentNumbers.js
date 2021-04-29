import React, {useState} from 'react';
import './CurrentNumbers.css';
import Number from './Number'

const CurrentNumbers = (props) => {
    let numbersInitial = String(props.brojevi).split(",");
    let firstFive = [];
    let remainingNumbers = [];
    for(let i=0; i < numbersInitial.length; i++){
        if(i<5){
            firstFive[i] = <Number>{numbersInitial[i]}</Number>
        }else{
            remainingNumbers[i-5] = <Number>{numbersInitial[i]}</Number>
        }
    } 
         
    return(
        <div className = 'currentNumbers'>
            <div className = "firstFive"> 
                {firstFive}
            </div>
            {remainingNumbers}
        </div>

    );
    
}

export default CurrentNumbers;