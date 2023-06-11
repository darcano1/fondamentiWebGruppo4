import React from "react";
import { ListGroup } from 'react-bootstrap';
import Chat from "./Chat";

export default function ListaChat({ lista }) {
    return (
        <ListGroup id="chat-list" className="list-group overflow-auto shadow-sm flex-grow-1 mb-2">
            { lista.map(chat => <Chat data={chat} />) }
        </ListGroup>
    );
}