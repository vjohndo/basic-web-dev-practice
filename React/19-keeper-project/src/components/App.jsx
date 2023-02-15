import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import Note from "./Note"
import CreateArea from "./CreateArea";

function App() {

    const [notes, setNotes] = useState([]);

    function addNote(note) {
        setNotes(prev => [...prev, note]);
        console.log(notes);
    }

    function removeNote(id) {
        setNotes(prev => {
            return prev.filter((note, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header />
            <CreateArea addNote={addNote} />
            <Notes notes={notes} removeNote={removeNote}/>
            <Footer />
        </div>
    );
}

export default App;
