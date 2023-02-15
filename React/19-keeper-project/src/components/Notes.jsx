import React from "react";
import Note from "./Note";

function Notes(props) {
    
    // Getting error "Cannot read properties of undefined (reading 'map')"
    // Was apparently because is was doing = props.notes.... 
    const {notes, removeNote} = props; 

    return (
        notes.map((note, index) => {

            const {title, content} = note;

            return <Note 
                key={index}
                id={index}
                title={title}
                content={content}
                removeNote={removeNote}
            />
        })
    );
}

export default Notes;