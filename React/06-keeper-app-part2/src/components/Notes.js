import React from "react";
import Note from "./Note";

function Notes(props) {

    const notes = props.notes;

    return notes.map( note => 
        <Note 
            key={note.key}
            title={note.title}
            content={note.content}
        />
    );
}

export default Notes;