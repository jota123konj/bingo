import React, {useState} from 'react';
import './CurrentNumbers.css';
import Number from './Number';

const CurrentNumbers = (props) => {
    if(props.roundNumbers !== undefined){
        const [ numbersState, setNumbersState] = useState({
            index: 0,
            firstFive: [],
            remainingNumbers: []
        });
        let endTime = props.roundEndTime;
        
        function setFunction(numberParam){
            if(numbersState.index < 5) {
                
            setNumbersState({firstFive: numbersState.firstFive.push(parseInt(numberParam, 10)),
                            index: numbersState.index++});
            console.log(numbersState.index);
                        }
            else {
                setNumbersState({remainingNumbers: numbersState.remainingNumbers.push(parseInt(numberParam, 10)),
                    index: numbersState.index++});
                    console.log(numbersState.remainingNumbers);
            }
            // splitArrayFun();
        }
        
     
        // function splitArrayFun() {
        //     let index = numbersState.numbers.length -1;
        //     console.log(index);
        
        //     if(index<5){
        //         setNumbersState({...firstFive[index]:numbersState.numbers[index]});
        //     }else{
        //         remainingNumbers[index -5] = numbersState.numbers[index];

        //     }
            
        // }
        let firstFiveFunc;
        if(numbersState.firstFive === []){
        firstFiveFunc = numbersState.firstFive.map((number) => {
            return <Number>{number}</Number>
          });
        }
        let remainingNumbersFunc = numbersState.remainingNumbers.map((number) => {
            return <Number>{number}</Number>
        })
        // console.log(firstFiveFunc);



        if(numbersState.index < 35){
            setInterval(() => {
                setFunction(props.roundNumbers[numbersState.index])
            }, 1000);
        }else{
            
        }


        return(
            <div className = 'currentNumbers'>
                <div className = "firstFive"> 
                    {firstFiveFunc}
                </div>
                {remainingNumbersFunc}
            </div>
    
        );
    }
    else return null;
    
}

export default CurrentNumbers;