import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default function Head({username, profilePic}) {
    return (
        <Container fluid id="header-right" className="d-flex flex-row ms-2 mt-2 ps-4 flex-shrink-1">
            <div id="img-profilo" className="container img-div m-0 p-0 ">
                <Image alt={username} src={profilePic} />
            </div>
            <h1 className="username-chat ms-3 flex-grow-1 text-start" id={"username-chat-amico"}> {username} </h1>
        </Container>
    );
}