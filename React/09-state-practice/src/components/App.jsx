import React, {useState} from "react";

function getTime() {
    return new Date().toLocaleTimeString();
}

function App() {
    
    const [time, setTime] = useState(getTime());


    function refreshTime() {
        setTime(getTime());
    }

    setInterval(refreshTime,1000);

    return (
        <div className="container">
            <h1>{time}</h1>
            <button onClick={refreshTime}>Get Time</button>
        </div>
    );
}

export default App;
