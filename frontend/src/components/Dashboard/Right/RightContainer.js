import React from "react";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import MessageArea from "./MessageArea";
import InputArea from "./InputArea";

export default function RightContainer({chatAperta, contenutoChatAperta}) {

    return (
        <Container id="right-container" className="p-4 d-flex flex-column">
            <Head username={chatAperta.username} profilePic={chatAperta.profilePic}/>
            <MessageArea messaggi={contenutoChatAperta}/>
            <InputArea idUtente={chatAperta._id}/>
        </Container>
    )
}