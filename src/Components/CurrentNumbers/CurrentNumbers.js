import React from "react";
import "./CurrentNumbers.css";
import Number from "./Number";
import Quote from "./Quote";
import "./Number.css";

const CurrentNumbers = (props) => {
  if (props.roundNumbers !== undefined) {
    let firstTenQuotes = [
      "1000",
      "7500",
      "5000",
      "2500",
      "1000",
      "500",
      "300",
      "200",
      "150",
      "100",
    ];
    let secondTenQuotes = [
      "90",
      "80",
      "70",
      "60",
      "50",
      "40",
      "30",
      "25",
      "20",
      "15",
    ];
    let lastTenQuotes = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

    let firstFive = [null];
    let firstTen = [null];
    let secondTen = [null];
    let lastTen = [null];
    firstTenQuotes.forEach((element, i) => {
      firstTenQuotes[i] = <Quote key={i}>{firstTenQuotes[i]}</Quote>;
      secondTenQuotes[i] = <Quote key={i}>{secondTenQuotes[i]}</Quote>;
      lastTenQuotes[i] = <Quote key={i}>{lastTenQuotes[i]}</Quote>;
    });
    props.roundNumbers.forEach((element, i) => {
      if (i < 5) {
        firstFive[i] = <Number key={i}>{element}</Number>;
      } else if (i < 15) {
        firstTen[i - 5] = <Number key={i}>{element}</Number>;
      } else if (i < 25) {
        secondTen[i - 15] = <Number key={i}>{element}</Number>;
      } else {
        lastTen[i - 25] = <Number key={i}>{element}</Number>;
      }
    });

    return (
      <div className="currentNumbers">
        <div className="firstFive">{firstFive}</div>
        <div className="remainingNumbers">{firstTen}</div>
        <div className="firstQuotes">{firstTenQuotes}</div>
        <div className="remainingNumbers">{secondTen}</div>
        <div className="secondQuotes">{secondTenQuotes}</div>
        <div className="remainingNumbers">{lastTen}</div>
        <div className="lastQuotes">{lastTenQuotes}</div>
      </div>
    );
  } else return null;
};

export default CurrentNumbers;
