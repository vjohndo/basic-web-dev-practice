import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import Note from "./Note";
import notes from "../notes";

function App() {

  return (
    <div>
      <Header />
      <Notes notes={notes}/>
      <Footer />
    </div>
  );
}

export default App;