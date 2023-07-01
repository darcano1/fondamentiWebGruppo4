import React from 'react';
import { Container } from 'react-bootstrap';
import Message from './Message';

export default function MessageArea({messaggi}) {

    //console.log(messaggi[0]);
    console.log("tedt");
    console.log(messaggi);

    return (
        <Container id="message-area" className="container flex-grow-1 ms-2 my-3 px-4">
            {messaggi !== [] ? (messaggi.map(messaggio => {return <Message classe={messaggio.sender === localStorage.getItem('_id') ? "my-message" : "friend-message"} testo={messaggio.text} orarioInvio={messaggio.createdAt}/>})) : <p> Nessun Messaggio </p>}
        </Container>
    );
}