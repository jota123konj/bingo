import React from 'react'
import './TicketNumbers.css'

const TicketNumber = () => {

let red=[];
let green=[];
let blue=[];
let purple=[];
let brown=[];
let yellow=[];
let orange=[];
let black=[];
const funkcija=()=>{
    for(let i=0;i<7;i++){
        let broj=i;
        if(i===0){
            broj=0;
            red[i]=1+broj;
            green[i]=2+broj;
            blue[i]=3+broj;
            purple[i]=4+broj;
            brown[i]=5+broj;
            yellow[i]=6+broj;
            orange[i]=7+broj;
            black[i]=8+broj;
        
            
        }else if(i<6){
            broj=8*i;
            red[i]=1+broj;
            green[i]=2+broj;
            blue[i]=3+broj;
            purple[i]=4+broj;
            brown[i]=5+broj;
            yellow[i]=6+broj;
            orange[i]=7+broj;
            black[i]=8+broj;
            
        }else{
            
            red[i]='^';
            green[i]='^';
            blue[i]='^';
            purple[i]='^';
            brown[i]='^';
            yellow[i]='^';
            orange[i]='^';
            black[i]='^';
            
        }
    }
    
}
    return(
        <div className = "ticketNumber">
        {funkcija()}
            <div className="red">
                {red.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="green">
                {green.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="blue">
                {blue.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="purple">
                {purple.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="brown">
                {brown.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="yellow">
                {yellow.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="orange">
                {orange.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>
            <div className="black">
                {black.map(rednek=>(
                    <div className = 'selectNumberBox'>{rednek}</div>
                ))}
            </div>

            
        </div>
    )
}

export default TicketNumber;