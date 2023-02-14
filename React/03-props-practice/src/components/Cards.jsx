import React from "react";
import Card from "./Card";

function Cards(props) {
    const contacts = props.contacts;
    return contacts.map( (contact) => {
        return <Card 
            key={contact.id}
            name={contact.name}
            img={contact.imgURL}
            phone={contact.phone}
            email={contact.email}
        />
    })
}

export default Cards;