import React from "react";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import MessageArea from "./MessageArea";
import InputArea from "./InputArea";

export default function RightContainer() {
    return (
        <Container id="right-container" className="p-4 d-flex flex-column">
            <Head />
            <MessageArea />
            <InputArea />
        </Container>
    )
}