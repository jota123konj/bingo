import "./Timer.css";
import React, { Component } from "react";
import axios from "axios";

class Timer extends Component {
  state = {
    start: null,
    vrijemeReseta: 0, //po defaultu je 7 minuta minus jedna sekunda, dakle 419*1000 milisekundi
    vrijemeString: "",
    ticking: false,
  };

  testnaFunkcija = () => {
    console.log("Pokrenuta je testna");
  };

  preostaloVrijeme = (vrijeme) => {
    let finish_split = vrijeme.split("T"); //this.state.finish/start
    let finish_time = finish_split[1].split(":");
    let rundaSat = finish_time[0];

    let rS = rundaSat.split("");
    if (rS[0] === 0) {
      //provjera da nema nule na početku
      rundaSat = rS[1];
    }

    let rundaMinute = finish_time[1];
    rS = rundaMinute.split("");
    if (rS[0] === 0) {
      //provjera da nema nule na početku
      rundaMinute = rS[1];
    }
    let rundaSekunde = finish_time[2];
    rS = rundaSekunde.split("");
    if (rS[0] === 0) {
      //provjera da nema nule na početku
      rundaSekunde = rS[1];
    }
    //console.log("round finnish time: sat: "+rundaSat+", minute: "+rundaMinute+", sekunde: "+rundaSekunde);

    let datum = new Date();
    let sat = datum.getHours();
    let minute = datum.getMinutes();
    let sekunde = datum.getSeconds();
    //console.log("Trenutni datum u reactu: ", sat, minute, sekunde);

    let rez = rundaSat - sat;
    if (rez === 0) {
      //ako je broj sati isti
      rez = (rundaMinute - minute) * 60;
      if (rundaSekunde > sekunde) {
        rez = rez + (rundaSekunde - sekunde);
      } else if (rundaSekunde < sekunde) {
        rez = rez - (sekunde - rundaSekunde);
      }
    } else {
      //ako nije isti broj sati (trenutno vrijeme u reaktu nikad ne može biti veće od vremena početka ili kraja runde)
      rez = (60 - minute + rundaMinute) * 60;
      if (rundaSekunde > sekunde) {
        rez = rez + (rundaSekunde - sekunde);
      } else if (rundaSekunde < sekunde) {
        rez = rez - (sekunde - rundaSekunde);
      }
    }

    return rez; //vrijeme do kraja
  };

  getTime = () => {
    axios
      .get(` http://165.227.175.177:8000/api/rounds/ready`)
      .then((res) => {
        this.setState({ start: res.data.startRoundTime });
        let vrijeme = (this.preostaloVrijeme(this.state.start) + 1) * 1000; //ovdje se postavi inicijalno vrijeme do pokretanja sljedeće runde
        this.setState({
          vrijemeReseta: vrijeme,
          ticking: false,
          vrijemeString: "",
        });
        //console.log("vrijeme u state-u unutar getRunde-a nakon poyiva api-a za ready rundu: "+this.state.vrijemeReseta);
        //this.zoviRundu(this.state.vrijemeReseta);
        // console.log("vrijeme je dobavljeno, vrijeme reseta: "+this.state.vrijemeReseta);
        // if(this.state.ticking){
        //     console.log("ticking je 'true'");
        // }else{
        //     console.log("ticking je 'false'");
        // }
      })
      .then(() => {
        if (this.state.vrijemeReseta <= 120000) {
          // console.log("vrijeme je manje od 120, ticking!");
          this.setState({ vrijemeString: this.timeTillStart(), ticking: true });
          // if(this.state.ticking){
          //     console.log("ticking je 'true'");
          // }else{
          //     console.log("ticking je 'false'");
          // }
          this.ticking();
        }
      })
      .then(() => {
        if (this.state.vrijemeReseta > 120000) {
          let vrijeme = this.state.vrijemeReseta - 120000;
          this.setState({ vrijemeReseta: vrijeme });
        }
        this.resetTime(this.state.vrijemeReseta);
      });
  };

  //ova funkcija vraća string koji pokazuje vrijeme
  timeTillStart = () => {
    let timeString = "vrijeme do pocetka iduce runde(sekunde): ";
    let time = this.state.vrijemeReseta;
    time = time / 1000;
    timeString = timeString + time;
    ////////////
    //console.log(timeString);
    //console.log("funkcija timeTillStart je pozvana!!");
    ////////////////
    let minute = 0;
    let sekunde = 0;
    minute = Math.floor(time / 60);
    sekunde = time % 60;

    timeString = "" + minute + ":" + sekunde;
    return timeString;
  };

  ticking = () => {
    setTimeout(() => {
      if (this.state.ticking) {
        let timeTillStart = this.state.vrijemeReseta - 1000;
        let timeTillStartString = this.timeTillStart();
        this.setState({
          vrijemeReseta: timeTillStart,
          vrijemeString: timeTillStartString,
        });
        this.ticking();
      }
    }, 1000); //jedna sekunda
  };

  timeUpdate = () => {
    return new Promise((resolve) => {
      let timeTillStart = this.state.vrijemeReseta - 1000;
      let timeTillStartString = this.timeTillStart();
      this.setState({
        vrijemeReseta: timeTillStart,
        vrijemeString: timeTillStartString,
      });
    });
  };

  resetTime = (vrijeme) => {
    setTimeout(() => {
      this.getTime();
    }, vrijeme);
  };

  componentDidMount() {
    this.getTime();
  }

  render() {
    let timeString = "0:0";
    timeString = this.state.vrijemeString;
    return (
      <div className="timer">
        <p className="clock">{timeString}</p>
      </div>
    );
  }
}
export default Timer;
