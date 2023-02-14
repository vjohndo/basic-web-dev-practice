import React from "react";

function Note() {

    const title = "This is a title";
    const content = "This is some content";

    return <div className="note">
        <h1>{title}</h1>
        <p>{content}</p>
    </div>;
}

export default Note;