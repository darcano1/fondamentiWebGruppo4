import React from "react";
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";

export default function InputArea({idUtente}) { //idUtente contiene l'id dell'utente con cui si sta messaggiando

    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }
    const [messaggio, setMessaggio] = useState("");

    function sendMessage() {
        console.log(messaggio);

        //Richiede i messaggi della chat con l'utente selezionato
                axios.post("http://localhost:4001/api/chat/", {
                            senderId: localStorage.getItem('_id'),
                            receiverId: idUtente,
                        }, config)
                        .then( res => {
                            console.log(res); //ID conversazione

                            // Caricamento nuovo messaggio sul db
                            creaNuovoMessaggio(res.data._id);
                        

                        })
                        .catch( err => {
                            console.log(err);
                        });
        
        // Reset dell'input text del messaggio
        document.getElementById("input-messaggio").value = "";
    }

    function creaNuovoMessaggio(idChat){

        axios.post("http://localhost:4001/api/messages/", {
            conversationId: idChat,
            sender: localStorage.getItem('_id'),
            text: messaggio,
                }, config)
                .then( res => {

                    // Si possono implementare controlli su invio del messaggio

                    //console.log(res.data);
                    })
                    .catch( err => {
                        console.log(err);
                    });

    }

    return (
        <InputGroup id="scrivi-messaggio" className="input-group ms-2 flex-shrink-1">
            <Button id="photo" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faImage} style={{color:'black'}}/></Button>
            <FormControl id="input-messaggio" contentEditable="true" value={messaggio} onChange={e => setMessaggio(e.target.value)} type="text" className="shadow-sm ps-2" placeholder="Scrivi un messaggio..." aria-label="testo" aria-describedby=""/>
            <Button id="invia" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faPaperPlane} style={{color:'black'}} onClick={sendMessage}/></Button>
      </InputGroup>
    );
}