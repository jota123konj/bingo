import React from 'react';
import './CurrentNumbers.css';
import Number from './Number'

const CurrentNumbers = (props) => {
    const roundNumbers = (props) => {

    }
    return(
        <div className = 'currentNumbers'>
            <div className = "firstFive"> 
                <Number>1</Number>
                <Number>2</Number>
                <Number>3</Number>
                <Number>4</Number>
                <Number>5</Number>
                
            </div>
                <Number>6</Number>
            <Number>7</Number>
            <Number>8</Number>
    
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