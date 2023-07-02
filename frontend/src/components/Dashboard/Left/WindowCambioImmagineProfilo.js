import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default function WindowAggiuntaAmico({handleCambiaImmagineProfilo, setCambioImmagineProfilo}) {

    const [immagine, setImmagine] = useState("");
    const [errore, setErrore] = useState(false);
    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }
    const contentType = { headers:
        {"Content-type": "multipart/form-data"}
    }

    function caricaImmagine(){

        const formData = new FormData();

        formData.append("name", immagine);
        axios.post("http://localhost:4001/api/upload/", {
            file: formData,
        }, contentType)
        .then( res => {
            // Reset dell'input text del messaggio
            document.getElementById("input-messaggio").value = "";
            setImmagine("");
            axios.post("http://localhost:4001/api/user/updateProfilePicture/" + localStorage.getItem("_id"), {
                profilePic: res.data.message,
            }, config)
            .then(res => {
                setCambioImmagineProfilo(false);
            })
            .catch( err => {
                console.log(err);
                setErrore(true);
            });
            //console.log(res.data);
        })
        .catch( err => {
            console.log(err);
            setErrore(true);
        });

    }

    function invio(e){

        if (e.keyCode === 13) {
            caricaImmagine()
        } 

    }

    return(
        <div id="aggiuntaAmico">
            <Container className="" id="formAggiuntaAmico">
                <Button id="chiudiWindow" className="input-group-text" onClick={handleCambiaImmagineProfilo}>
                    <FontAwesomeIcon icon={faXmarkCircle} style={{color:'gray'}}/>
                </Button>
                <h1>Inserisci immagine profilo</h1>
                <InputGroup id="scrivi-messaggio" className="input-group ms-2 flex-shrink-1 inputAggiungiAmico">
                    <FormControl id="input-messaggio" contentEditable="true" value={immagine} type="file" onChange={e => setImmagine(e.target.value)} onKeyDown={invio} className="shadow-sm ps-3 inputAggiungiAmico1" placeholder="Immagine" aria-label="testo" aria-describedby=""/>
                    <Button id="invia" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faArrowUp} style={{color:'black'}} onMouseDown={caricaImmagine}/></Button>
                </InputGroup>
                {errore && <Form.Floating className='mb-2' style={{color: 'red', fontSize: "1.2rem"} }>Errore nell'upload</Form.Floating>}
            </Container>
        </div>
    )

}