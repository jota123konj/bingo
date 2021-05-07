import React from "react";
import "./Number.css";

const Number = (props) => {
  const Color = (number) => {
    switch (number % 8) {
      case 1:
        return "redColor";
      case 2:
        return "greenColor";
      case 3:
        return "blueColor";
      case 4:
        return "purpleColor";
      case 5:
        return "brownColor";
      case 6:
        return "yellowColor";
      case 7:
        return "orangeColor";
      default:
        return "blackColor";
    }
  };
 

  return (
    <div className="number num">
      <div className={Color(props.children)}>{props.children}</div>
    </div>
  );
};
export default Number;
