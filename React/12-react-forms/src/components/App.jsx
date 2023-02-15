import React, { useState } from "react";



function App() {
    const [name, setName] = useState("");
    const [headingText, setHeadingText] = useState("");

    function handleChange(event) {
        console.log(event.target.value);
        setName(event.target.value);
    };

    function handleClick(event) {
        setHeadingText(name);
        event.preventDefault();
    };

    return (
        <div className="container">
            <form onSubmit={handleClick}>
                <h1>Hello, {headingText}</h1>
                <input
                    type="text"
                    placeholder="What's your name?"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
