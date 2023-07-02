import React from "react";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import MessageArea from "./MessageArea";
import InputArea from "./InputArea";

export default function RightContainer({chatAperta, contenutoChatAperta, isChatAperta, setIsChatAperta}) {

    return (
        <Container id="right-container" className="p-4 d-flex flex-column">
            {isChatAperta && <Head username={chatAperta.username} profilePic={chatAperta.profilePic}/>}
            {isChatAperta && <MessageArea messaggi={contenutoChatAperta}/>}
            {isChatAperta && <InputArea idUtente={chatAperta._id}/>}
        </Container>
    )
}