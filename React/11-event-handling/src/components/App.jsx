import React, {useState} from "react";

function App() {

    const [headingText, setHeadingText] = useState("Hello");
    const [isHovering, setIsHovering] = useState(false);

    function handleClick()  {
        setHeadingText("Submitted");
    }

    function handleMouseOver() {
        setIsHovering(true);
    }

    function handleMouseOut() {
        setIsHovering(false);
    }

    function handleChange(event) {
        console.log(event.target.value);
    }

    return (
        <div className="container">
            <h1>{headingText}</h1>
            <input onChange={handleChange} type="text" placeholder="What's your name?" />
            <button 
                // style={isHovering && {backgroundColor: "black"}} <-- why does this not work?
                style={{backgroundColor: isHovering && "black"}}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                Submit
            </button>
        </div>
    );
}

export default App;
