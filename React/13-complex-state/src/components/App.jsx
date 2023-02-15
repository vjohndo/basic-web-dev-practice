import React, {useState} from "react";

function App() {

    const [title, setTitle] = useState("");
    const [fullName, setFullName] = useState({
        fName: "",
        lName: ""
    });

    // First principles approach to updating object
    function handleChange(event) {
        const {value, name} = event.target;

        setFullName( (previousValue) => {
            if (name === "fName") {
                return {
                    fName: value,
                    lName: previousValue.lName
                };
            } else if (name === "lName") {
                return {
                    fName: previousValue.fName,
                    lName: value
                }
            };
        })
    }

    // function handleChangeFName(event) {
    //     setFullName(fName=event.target.value);
    // }

    // function handleChangeLName(event) {
    //     setFullName(event.target.value);
    // }

    function handleSubmit(event) {
        setTitle(`${fullName.fName} ${fullName.lName}`);
        event.preventDefault();
    }

    return (
        <div className="container">
            <h1>Hello {title}</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange}
                    name="fName"
                    placeholder="First Name" 
                    value={fullName.fName}
                />
                <input
                    onChange={handleChange}
                    name="lName"
                    placeholder="Last Name"
                    value={fullName.lName}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
