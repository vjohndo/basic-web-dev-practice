import React from "react";
import Dictionary from "./Dictionary";
import terms from "../emojipedia";

function App() {
    return (
        <div>
            <h1>
                <span>emojipedia</span>
            </h1>
            <Dictionary terms={terms}/>
        </div>
    );
}

export default App;
