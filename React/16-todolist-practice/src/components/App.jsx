import React, {useState} from "react";

function App() {

    const [inputText, setInputText] = useState("");
    const [list, setList] = useState(["A item"]);

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function handleAdd() {
        setList(prev => [...prev, inputText]);
        setInputText("");
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={handleChange} type="text" value={inputText} />
                <button onClick={handleAdd}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {list.map( (liContent, index) => <li key={index}>{liContent}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default App;
