import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import ListaChat from "./ListaChat";


export default function LeftContainer({handleChatAperta, handleAggiungiAmico}) {

    // HEADER TOKEN 
    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }

    // STATO PER SELEZIONARE SOLO AMICI
    const [listaAmici, setListaAmici] = useState(false)
    function handleListaAmici(e) { 
        e.preventDefault();
        setListaAmici(!listaAmici)
    };

    // PRENDO TUTTE LE CHAT
    const [elencoChat, setElencoChat] = useState([]);
    const [elencoIdAmici, setElencoIdAmici] = useState([]);
    useEffect( () => {
        axios.get('http://localhost:4001/api/chat/' + localStorage.getItem('_id'), config)
        .then( res => { setElencoChat(res.data) })
        .catch( err => console.log(err.response));

        // AMICI
        if(listaAmici) {
            axios.get('http://localhost:4001/api/user/friendList/'+ localStorage.getItem("_id"), config)
            .then(res => { setElencoIdAmici(res.data) })
            .catch(err => console.log(err.response));
        }
    }, [listaAmici/*,elencoChat, elencoIdAmici*/])

    return (
        <Container fluid className="d-flex flex-column flex-shrink-1" id="left-container">
            <Head amici={listaAmici} handleAmici={handleListaAmici} handleAggiungiAmico={handleAggiungiAmico}/>
            <ListaChat lista={listaAmici ? elencoIdAmici : elencoChat} amici={listaAmici} handleChatAperta={handleChatAperta} setElencoIdAmici={setElencoIdAmici} elencoIdAmici={elencoIdAmici}/>
        </Container>
    )
}