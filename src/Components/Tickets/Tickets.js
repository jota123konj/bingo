import React, { Component } from 'react';
import TicketNumbers from '../TicketNumbers/TicketNumbers';
import CurrentTickets from '../CurrentTickets/CurrentTickets';



class Tickets extends Component {

  
  tickets = [
    '1,2,3,4,5,6',
    '12,21,32,43,2,1'
  ]
  
  render() {
    
    return (
      <div>
        <CurrentTickets tickets = {this.tickets}/>
        <TicketNumbers/>
      </div>
    );
  }
}

export default Tickets;
