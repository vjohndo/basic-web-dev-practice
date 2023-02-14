//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

const currentHour = new Date().getHours();
let greeting;
const customStyling = {};

if (currentHour < 12) {
  greeting = "Good morning";
  customStyling.color = "red";
} else if (currentHour < 18) {
  greeting = "Good afternoon";
  customStyling.color = "green";
} else {
  greeting = "Good evening";
  customStyling.color = "blue";
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={customStyling}>
      {greeting}
    </h1>
  </div>,
  document.getElementById("root")
);
