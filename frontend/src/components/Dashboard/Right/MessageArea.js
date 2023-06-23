import React from 'react';
import { Container } from 'react-bootstrap';
import Message from './Message';

export default function MessageArea({messaggi}) {

    //console.log(messaggi[0]);

    return (
        <Container id="message-area" className="container flex-grow-1 ms-2 my-3 px-4">
            {messaggi.map(messaggio => {return <Message classe={"message " + messaggio.sender === localStorage.getItem('_id') ? "my-message" : "friend-message"} testo={messaggio.text} orarioInvio={messaggio.createdAt}/>})}
        </Container>
    );
}