//Create a react app from scratch.
//It should display a h1 heading.
//It should display an unordered list (bullet points).
//It should contain 3 list elements.
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <h1> This is the h1 heading </h1>
    <ul>
      <li> This is li 1 </li>
      <li> This is li 2 </li>
      <li> This is li 3 </li>
      <li />
    </ul>
  </div>,
  document.getElementById("root")
);