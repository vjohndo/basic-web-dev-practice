import React from "react";
import ReactDOM from "react-dom";

const imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Wennington_wildfire_56.jpg/1280px-Wennington_wildfire_56.jpg";

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">
      My Favourite Foods
    </h1>
    <div>
      <img
        className="building"
        src={imgURL}
        alt="Building"
      />
      <img
        className="building"
        src={imgURL}
        alt="Building"
      />
      <img
        className="building"
        src={imgURL}
        alt="Building"
      />
    </div>
  </div>,
  document.getElementById("root")
);