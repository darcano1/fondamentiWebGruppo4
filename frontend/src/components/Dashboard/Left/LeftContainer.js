import React from "react";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import ListaChat from "./ListaChat";


export default function LeftContainer() {
    return (
        <Container fluid className="d-flex flex-column flex-shrink-1" id="left-container">
            <Head />
            <ListaChat />
        </Container>
    )
}