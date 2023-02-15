import React from "react";
import ReactDOM from "react-dom";

const fName = "Angela";
const lName = "Yu";
const num = 7;

// Wrap variable in curly braces
// Any JS expression is good to go inside the curly braces
// Can't have a statement though
ReactDOM.render(
  <div>
    <h1>Hello {`${fName} ${lName}`}!</h1>
    <h1>
      Hello {fName} {lName}!
    </h1>
    <p>Your lucky number is {num}.</p>
    <p>Your lucky number is not {Math.floor(Math.random() * 10)}.</p>
    <p>Your lucky number is not {Math.floor(Math.random() * 10)}.</p>
  </div>,
  document.getElementById("root")
);