import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CurrentNumbers from './Components/CurrentNumbers/CurrentNumbers';
import TicketNumbers from './Components/TicketNumbers/TicketNumbers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  state = {
    loading: true,
    brojevi: null,
    finish: null,
    count: 0,
    izvuceni: [],
    rundaGotova: false
  };

    
  componentDidMount(){
        
    this.getRunda();
    this.zoviRundu();
    
}
  
  getRunda = () => {
    axios.get(` http://138.68.72.169:8000/api/rounds/running`).then((res) => {
        console.log(res.data.drawnNum);
        this.setState({ brojevi: res.data.drawnNum,finish: res.data.finishRoundTime, loading: false, rundaGotova: false });
    }) 
    .then(()=>{
        let noviNiz=[];
        let kopija=this.state.brojevi.split(",");
        let i=0;
        this.puniListu(i, noviNiz, kopija); 
    }
    );
  }
  zoviRundu=()=>{
        
    setTimeout(()=>{
        this.getRunda();
        if(this.state.rundaGotova){
                this.zoviRundu();
            
        }
    }, 1*75*1000);
    
  }

  puniListu=(i, noviNiz, kopija)=>{
          setTimeout(()=>{
              if(i===34){
                  this.setState({rundaGotova: true});
              }

              if(i<35){
                  noviNiz[i]=kopija[i];
                  
                  console.log("Korak: " + i);
                  this.setState({izvuceni: noviNiz})
                  this.puniListu(i+1,noviNiz, kopija);
              }
                  
          }, 1000);//8571 default
  }

  
  render() {
    return (
      <div className = "App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path = '/' exact/>
          </Switch>
        </Router>
        <div className="gameContainer">
          <CurrentNumbers roundNumbers = {this.state.izvuceni}/>
          
          <TicketNumbers roundNumbers = {this.state.izvuceni}/>
        </div>
      </div>
    );
  }
}

export default App;
