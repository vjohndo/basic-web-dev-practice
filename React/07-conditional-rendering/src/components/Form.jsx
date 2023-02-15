import React from "react";
import Input from "./Input";

function Form(props) {

    const isRegistered = props.isRegistered;

    return (
        <form className="form">
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            { !isRegistered && <Input type="password" placeholder="Confirm Password" /> }
            <button type="submit">{ isRegistered ? "Login" : "Register" }</button>
        </form>
    );
}

export default Form;