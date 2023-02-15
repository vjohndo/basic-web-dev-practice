import React from "react";
import Form from "./Form";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      <Form isRegistered={userIsRegistered}/>
    </div>
  );
}

export default App;

// Example conditional rendering:
// { isLoggedIn ? <h1>Hello</h1> : <Login /> }
// { currentTime > 12 ? <h1>Why are you still here?</h1> : null }
// { currentTime > 12 && <h1>Why are you still here?</h1>}