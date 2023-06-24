import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default function WindowAggiuntaAmico({handleAggiungiAmico}) {

    const [username, setUsername] = useState("");
    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }

    function aggiungiAmico(){

        // codice axios per aggiunta amico
        /*axios.post("http://localhost:4001/api/user/addFriend/", {
                            senderId: localStorage.getItem('_id'),
                            receiverId: idUtente,
                        }, config)
                        .then( res => {
                            //console.log(res.data._id); ID conversazione

                            // Caricamento nuovo messaggio sul db
                            creaNuovoMessaggio(res.data._id);

                        })
                        .catch( err => {
                            console.log(err);
                        });*/

        // Reset dell'input text del messaggio
        document.getElementById("input-messaggio").value = "";

    }

    return(
        <div id="aggiuntaAmico">
            <Container className="" id="formAggiuntaAmico">
                <Button id="chiudiWindow" className="input-group-text" onClick={handleAggiungiAmico}>
                    <FontAwesomeIcon icon={faXmarkCircle} style={{color:'gray'}}/>
                </Button>
                <h1>Aggiungi un nuovo amico</h1>
                <InputGroup id="scrivi-messaggio" className="input-group ms-2 flex-shrink-1 inputAggiungiAmico">
                    <FormControl id="input-messaggio" contentEditable="true" value={username} type="text" onChange={e => setUsername(e.target.value)} className="shadow-sm ps-3 inputAggiungiAmico1" placeholder="username amico" aria-label="testo" aria-describedby=""/>
                    <Button id="invia" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faPlus} style={{color:'black'}} onClick={aggiungiAmico}/></Button>
                </InputGroup>
            </Container>
        </div>
    )

}