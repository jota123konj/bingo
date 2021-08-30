import React, { Component } from "react";
import TicketNumbers from "../TicketNumbers/TicketNumbers";
import CurrentTickets from "../CurrentTickets/CurrentTickets";
import axios from "axios";
import "../Timer/Timer";
//import Timer from '../Timer/Timer';

class Tickets extends Component {
  state = {
    ticketsReady: [],
    ticketsRunning: [],
    roundFinished: false,
    ticketsJustNumbers: [],
    timeLoaded: false,
    vrijemeReseta: 0,
    postCounter: 0,
  };
  objekat = new Timer();

  ticketsUpdate = (parametar) => {
    let tempTickets = this.state.ticketsJustNumbers;
    tempTickets.push(parametar);

    this.setState({ ticketsJustNumbers: tempTickets });
  };

  samoGet = () => {
    axios
      .get(` http://64.225.102.112:8000/api/tickets`, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        let tempTickets = [];
        let tempTicketsRunning = [];
        let tempTicketsReady = [];
        let tempTicketsJustNumbers = [];
        tempTickets = res.data;
        for (let i = 0; i < tempTickets.length; i++) {
          if (res.data[i].status === "2") {
            tempTicketsRunning.push(res.data[i]);
          } else {
            tempTicketsReady.push(res.data[i]);
          }
          tempTicketsJustNumbers.push(res.data[i].selectedNum);
        }
        this.setState({ ticketsReady: tempTicketsReady });
        //this.setState({ ticketsReady: tempTicketsReady, ticketsRunning: tempTicketsRunning, ticketsJustNumbers: tempTicketsJustNumbers});
        console.log("samoGet je setao state!");
      });
  };

  getActiveTickets = () => {
    axios
      .get(` http://64.225.102.112:8000/api/tickets`, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        let tempTickets = [];
        let tempTicketsRunning = [];
        let tempTicketsReady = [];
        let tempTicketsJustNumbers = [];
        tempTickets = res.data;
        for (let i = 0; i < tempTickets.length; i++) {
          if (res.data[i].status === "2") {
            tempTicketsRunning.push(res.data[i]);
          } else {
            tempTicketsReady.push(res.data[i]);
          }
          tempTicketsJustNumbers.push(res.data[i].selectedNum);
        }
        // this.setState({ticketsReady: [], ticketsRunning: []});
        if (this.state.timeLoaded === false) {
          this.setState({
            ticketsReady: tempTicketsReady,
            ticketsRunning: tempTicketsRunning,
          });
        } else {
          if (this.state.roundFinished === true) {
            this.setState({
              ticketsReady: tempTicketsReady,
              ticketsRunning: tempTicketsRunning,
            });
          } else {
            this.setState({ ticketsReady: tempTicketsReady });
          }
        }

        console.log("dobavilo je nove tickete i setalo State!");
      })
      .then(async () => {
        let vrijeme = 0;
        if (this.state.timeLoaded === false) {
          vrijeme = await this.objekat.getTime();
          this.setState({ timeLoaded: true });
          if (vrijeme > 120000) {
            vrijeme = vrijeme - 120000;
            this.setState({ roundFinished: false });
          } else {
            this.setState({ roundFinished: true });
          }
        } else {
          if (this.state.roundFinished === true) {
            this.setState({ vrijemeReseta: 300000, roundFinished: false });
          } else {
            this.setState({ vrijemeReseta: 120000, roundFinished: true });
          }
          vrijeme = this.state.vrijemeReseta;
        }
        if (this.state.roundFinished) {
          console.log("roundFinnished je true!");
        } else {
          console.log("roundFinnished je false!");
        }
        console.log("vrijeme: " + vrijeme);
        this.resetTicketList(vrijeme);
      })
      .catch(async () => {
        let vrijeme = 0;
        if (this.state.timeLoaded === false) {
          vrijeme = await this.objekat.getTime();
          this.setState({ timeLoaded: true });
          if (vrijeme > 120000) {
            vrijeme = vrijeme - 120000;
            this.setState({ roundFinished: false });
          } else {
            this.setState({ roundFinished: true });
          }
        } else {
          if (this.state.roundFinished === true) {
            this.setState({ vrijemeReseta: 300000, roundFinished: false });
          } else {
            this.setState({ vrijemeReseta: 120000, roundFinished: true });
          }
          vrijeme = this.state.vrijemeReseta;
        }

        if (sessionStorage.getItem("logged-in") === "true") {
          this.setState({ ticketsReady: [] });
        } else {
          this.setState({ ticketsReady: [], ticketsRunning: [] });
        }
        if (this.state.roundFinished) {
          console.log("roundFinnished je true!");
        } else {
          console.log("roundFinnished je false!");
        }
        console.log("vrijeme: " + vrijeme);
        this.resetTicketList(vrijeme);
      });
  };

  resetTicketList = (vrijeme) => {
    console.log("vrijeme unutar resetTicketList funkcije: " + vrijeme);
    setTimeout(() => {
      this.getActiveTickets();
      console.log("setTimeout je završio!");
    }, vrijeme);
  };

  componentDidMount() {
    this.getActiveTickets();
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("logged-in") === "true" ? (
          <CurrentTickets
            roundFinished={this.state.roundFinished}
            ticketsReady={this.state.ticketsReady}
            ticketsRunning={this.state.ticketsRunning}
          />
        ) : null}
        <TicketNumbers funkProp={this.samoGet} />
      </div>
    );
  }
}

export default Tickets;

class Timer {
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

  async getTime() {
    let vrijeme = 0;

    await axios
      .get(` http://64.225.102.112:8000/api/rounds/ready`)
      .then((res) => {
        //this.setState({ start: res.data.startRoundTime});
        vrijeme = (this.preostaloVrijeme(res.data.startRoundTime) + 1) * 1000; //ovdje se postavi inicijalno vrijeme do pokretanja sljedeće runde
        //this.setState({vrijemeReseta: vrijeme, ticking: false, vrijemeString: ""});
      });
    console.log("vrijeme unutar getTime-a: " + vrijeme);
    return vrijeme;
  }

  resetTime = (vrijeme) => {
    setTimeout(() => {
      this.getTime();
    }, vrijeme);
  };
}
