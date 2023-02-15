import React from "react";
import Term from "./Term";

function Dictionary(props) {

    const terms = props.terms;

    return <div className="dictionary">
        {terms.map( term => 
            <Term 
                key={term.id}
                name={term.name}
                meaning={term.meaning}
                emoji={term.emoji}
            />
        )}
    </div>
}

export default Dictionary;