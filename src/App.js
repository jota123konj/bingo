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
    start: null,
    izvuceni: [],
    rundaGotova: false,
    vrijemeReseta: 420*1000//po defaultu je jednako defaultnom hehe
  };

  /////////////////////////////
  componentDidMount(){
        
    this.getRunda();
    //this.zoviRundu(this.state.vrijemeReseta);
    
    //console.log("vrijeme u state-u unutar componentDidMount-a nakon poyiva getRunde: "+this.state.vrijemeReseta);
    // this.zoviRundu(this.state.vrijemeReseta);
    
  }
  
  
  /////////////////////////
  preostaloVrijeme=(vrijeme)=>{
    let finish_split=vrijeme.split("T");//this.state.finish/start
    let finish_time=finish_split[1].split(":");
    let rundaSat=finish_time[0];
    
    let rS=rundaSat.split("");
    if(rS[0]==0){//provjera da nema nule na početku
      rundaSat=rS[1];
    }
    
    let rundaMinute=finish_time[1];
    rS=rundaMinute.split("");
    if(rS[0]===0){//provjera da nema nule na početku
      rundaMinute=rS[1];
    }
    let rundaSekunde=finish_time[2];
    rS=rundaSekunde.split("");
    if(rS[0]===0){//provjera da nema nule na početku
      rundaSekunde=rS[1];
    }
    //console.log("round finnish time: sat: "+rundaSat+", minute: "+rundaMinute+", sekunde: "+rundaSekunde);
    
    let datum=new Date();
    let sat=datum.getHours();
    let minute=datum.getMinutes();
    let sekunde=datum.getSeconds();
    //console.log("Trenutni datum u reactu: ", sat, minute, sekunde);
    
    let rez=rundaSat-sat;
    if(rez===0){//ako je broj sati isti
      rez=(rundaMinute-minute)*60;
      if(rundaSekunde>sekunde){
        rez=rez+(rundaSekunde-sekunde);
      }else if(rundaSekunde<sekunde){
        rez=rez-(sekunde-rundaSekunde);
      }
      
    }else{//ako nije isti broj sati (trenutno vrijeme u reaktu nikad ne može biti veće od vremena početka ili kraja runde)
      rez=((60-minute)+rundaMinute)*60;
      if(rundaSekunde>sekunde){
        rez=rez+(rundaSekunde-sekunde);
      }else if(rundaSekunde<sekunde){
        rez=rez-(sekunde-rundaSekunde);
      }
    }
    
    return rez;//vrijeme do kraja
  }
  
  brojPreostalih=(vrijemDoKraja)=>{
    let preostaliBrojevi=vrijemDoKraja/8.571;
    preostaliBrojevi=Math.floor(preostaliBrojevi);
    //console.log("Sekundi do kraja: "+vrijemDoKraja);
    //console.log("preostalih brojeva za ispisati: "+preostaliBrojevi);
    return preostaliBrojevi;
  }
  
  ///////////////////////////
  getRunda = () => {
    
    let preostali;
    let vrijeme;
    
    
    axios.get(` http://138.68.72.169:8000/api/rounds/running`).then((res) => {
        //console.log(res.data.drawnNum);
        this.setState({ brojevi: res.data.drawnNum,finish: res.data.finishRoundTime, loading: false, rundaGotova: false });
        vrijeme=(this.preostaloVrijeme(this.state.finish)+121)*1000;//ovdje se postavi inicijalno vrijeme do pokretanja sljedeće runde
        this.setState({vrijemeReseta: vrijeme});
        //console.log("vrijeme u state-u unutar getRunde-a nakon poyiva api-a za running rundu: "+this.state.vrijemeReseta);
        preostali=this.brojPreostalih(this.preostaloVrijeme(this.state.finish));
    }) 
    .then(()=>{
        let noviNiz=[];
        let kopija=this.state.brojevi.split(",");
        let i=0;
        
        
        
        this.puniListu(i, noviNiz, kopija, preostali); 
    }
    )
    .then(()=>{
      this.zoviRundu(this.state.vrijemeReseta);
    })
    .catch(err=>{
      //ako nema runde koja je u tijeku, hvataj rundu u pripremi
      //console.log("error je uhvacen");
      if(this.state.loading){
        axios.get(` http://138.68.72.169:8000/api/rounds/ready`).then((res) => {
        
          this.setState({ start: res.data.startRoundTime});
          vrijeme=(this.preostaloVrijeme(this.state.start)+1)*1000;//ovdje se postavi inicijalno vrijeme do pokretanja sljedeće runde
          this.setState({vrijemeReseta: vrijeme});
          //console.log("vrijeme u state-u unutar getRunde-a nakon poyiva api-a za ready rundu: "+this.state.vrijemeReseta);
          this.zoviRundu(this.state.vrijemeReseta);
        });
        
      }
    });
    
  }
  
  //////////////////////
  zoviRundu=(vrijeme)=>{
    //console.log("zoviRundu je pozvana.");
    setTimeout(()=>{
        
        this.getRunda();
        /*
        if(this.state.rundaGotova){
                this.zoviRundu(this.state.vrijemeReseta);
            
        }
        */
    }, vrijeme);//300*1000
    
  }
  
  //////////////////////////////////////////
  puniListu=(i, noviNiz, kopija, preostali)=>{
          if(i===0){
            let izaslo=35-preostali;
            while(i<izaslo){
              noviNiz[i]=kopija[i];
              i++;
            }
            this.setState({izvuceni: noviNiz});
            
          }
          setTimeout(()=>{
              if(i===34){
                  this.setState({rundaGotova: true, vrijemeReseta: 420000});
              }

              if(i<35){
                  noviNiz[i]=kopija[i];
                  
                  //console.log("Korak: " + i);
                  this.setState({izvuceni: noviNiz});
                  this.puniListu(i+1,noviNiz, kopija);
              }
                  
          }, 8571);//8571 default
  }

  
  render() {
    
    //console.log(this.state.finish);
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
          
          <TicketNumbers/>
        </div>
      </div>
    );
  }
}

export default App;
