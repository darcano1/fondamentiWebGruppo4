import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faSignOut, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


export default function Head({ amici, handleAmici, handleNewChat, handleAggiungiAmico}) {

    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <Container fluid className="d-flex flex-row">
                <h1 className="me-auto ms-3 mt-2">{amici ? "Amici" : "Chats"}</h1>
                <div id="buttons-left-container" className="input-group d-flex flex-row">
                    <Button id="nuovoAmico" className="input-group-text shadow-sm me-2" onMouseDown={handleAggiungiAmico}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{color:'black'}}/>
                    </Button>
                    <Button id="amici" className="input-group-text shadow-sm me-2" onMouseDown={handleAmici} style={amici ? {backgroundColor: 'lightgrey'} : null}>
                        <FontAwesomeIcon icon={faUsers} style={{color:'black'}}/>
                    </Button>
                    <Button id="logout" className="input-group-text shadow-sm" onMouseDown={logOut}>
                        <FontAwesomeIcon icon={faSignOut} style={{color:'black'}}/>
                    </Button>
                </div>
            </Container>
            <InputGroup className="mb-3 flex-shrink-1" id="cerca-chat">
                <InputGroup.Text className="input-group-text shadow-sm" id=""><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                <FormControl type="text" className="shadow-sm" placeholder="Cerca una chat" aria-label="Username" aria-describedby="" />
            </InputGroup>
        </>
    )
}