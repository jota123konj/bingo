import React, { Component } from 'react';
import TicketNumbers from '../TicketNumbers/TicketNumbers';
import CurrentTickets from '../CurrentTickets/CurrentTickets';
import axios from 'axios';
import '../Timer/Timer';
import Timer from '../Timer/Timer';


class Tickets extends Component {

  state={
    ticketsReady: [],
    ticketsRunning: []
  }
  
  //objekat=new Timer();
  
  ticketsUpdate=(parametar)=>{    
    let tempTickets=this.state.ticketsReady;
    tempTickets.push(parametar);
    
    this.setState({ticketsReady: tempTickets});
    
  }
  
  getActiveTickets=()=>{
    axios.get(` http://138.68.72.169:8000/api/rounds/ready`).
    then((res) => {
        let tempTickets=[];//ovde ih stavim sve, pa ih u ove donje razvrstam u for petlji
        let tempTicketsRunning=[];
        let tempTicketsReady=[];
        for(let i=0;i<tempTickets.length;i++){
          if(res.data.status==="running"){
            tempTicketsRunning.push(res.data.nesto);
          }else{
            tempTicketsReady.push(res.data.nesto);
          }
        }
        
        this.setState({ ticketsReady: tempTicketsReady, ticketsRunning: tempTicketsRunning});
    }).
    then(()=>{
      
      let vrijeme=0;
      
      this.resetTicketList(vrijeme);
    });
  }
  
  
  
  resetTicketList=(vrijeme)=>{
    
    setTimeout(()=>{
      
      this.getActiveTickets();
      
    }, vrijeme);
    
  }
  
  componentDidMount(){
    
    //this.getActiveTickets();
    
    //this.objekat.testnaFunkcija();
  }
  
  render() {
    return (
      
      <div>
        <CurrentTickets tickets = {this.state.ticketsReady}/>
        <TicketNumbers funkProp={this.ticketsUpdate}/>
      </div>
    );
  }
}

export default Tickets;
