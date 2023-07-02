import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { aggiornaAmici } from "./LeftContainer";

export default function WindowAggiuntaAmico({handleAggiungiAmico, setAggiuntaAmico}) {

    const [username, setUsername] = useState("");
    const [errore, setErrore] = useState(false);
    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }

    function aggiungiAmico(){

        // codice axios per aggiunta amico

        // richiesta per ottenere id amico
        axios.get('http://localhost:4001/api/user/' + username, config)
        .then(res => res.data)
        .then(utente => {
            //console.log(utente);
            // Reset dell'input text del messaggio
            document.getElementById("input-messaggio").value = "";

            //console.log(utente);
            axios.put("http://localhost:4001/api/user/addFriend/" + utente._id, {}, config)
                            .then( res => {
                                setUsername("");
                                setErrore(false);
                                setAggiuntaAmico(false);
                                //console.log("id amico preso");
                                //aggiornaAmici
                            })
                            .catch( err => {
                                console.log(err);
                            });
          })
          .catch( err => {
            console.log(err); 

            //Aggiornare stato che fa apparire il messaggio
            //Utente non trovato
            setErrore(true);
        });

    }

    function invio(e){

        if (e.keyCode === 13) {
            aggiungiAmico()
        } 

    }

    return(
        <div id="aggiuntaAmico">
            <Container className="" id="formAggiuntaAmico">
                <Button id="chiudiWindow" className="input-group-text" onClick={handleAggiungiAmico}>
                    <FontAwesomeIcon icon={faXmarkCircle} style={{color:'gray'}}/>
                </Button>
                <h1>Aggiungi un nuovo amico</h1>
                <InputGroup id="scrivi-messaggio" className="input-group ms-2 flex-shrink-1 inputAggiungiAmico">
                    <FormControl id="input-messaggio" contentEditable="true" value={username} type="text" onChange={e => setUsername(e.target.value)} onKeyDown={invio} className="shadow-sm ps-3 inputAggiungiAmico1" placeholder="username amico" aria-label="testo" aria-describedby=""/>
                    <Button id="invia" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faPlus} style={{color:'black'}} onMouseDown={aggiungiAmico}/></Button>
                </InputGroup>
                {errore && <Form.Floating className='mb-2' style={{color: 'red', fontSize: "1.2rem"} }>Utente non trovato</Form.Floating>}
            </Container>
        </div>
    )

}