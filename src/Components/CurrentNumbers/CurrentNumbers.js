import React, {useState} from 'react';
import './CurrentNumbers.css';
import Number from './Number'

const CurrentNumbers = (props) => {
    let numbrs = String(props.brojevi).split(",");
    let roundNum = null;
    let neam = [];
    roundNum = (numbrs.forEach(element => {
        neam.push(<Number>{element}</Number>)
    }));
    return(
        <div className = 'currentNumbers'>
            <div className = "firstFive"> 
                
            </div>
            {neam}
        </div>

    );
    
}

export default CurrentNumbers;

 // rng=()=>{
        
    //     let svi=[];
    //     let izvuceni=[];
    //     for(let i=1;i<49;i++){
    //         svi[i]=i;
    //     }
    //     let rnd=0;
    //     let ukupni=48;
    //     for(let i=0;i<35;i++){
    //         rnd=Math.floor((Math.floor((Math.random()*100)+1))*(ukupni/100));
    //         izvuceni[i]=svi[rnd];
    //         svi=svi.filter(broj=>broj!==svi[rnd]);
    //         ukupni--;
            
    //     }
    //     console.log(izvuceni);
    //     return izvuceni;
    // }
    // callRng=()=>{
    //     let niz=[];
    //     niz=this.rng();
    //     this.setState({
    //         izvuceni: niz
    //     });
        
    // }
    // constructor(props){
    //     super(props);
        
    //     this.state={
    //     loading: true,
    //     izvuceni: []
    // }