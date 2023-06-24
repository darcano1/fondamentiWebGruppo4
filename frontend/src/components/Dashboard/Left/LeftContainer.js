import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import ListaChat from "./ListaChat";


export default function LeftContainer({handleChatAperta, handleAggiungiAmico}) {

    // header token 
    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }

    // stato per amici
    const [listaAmici, setListaAmici] = useState(false)
    function handleListaAmici(e) { 
        e.preventDefault();
        setListaAmici(!listaAmici)
    };

    function handleNewChat(e){

    }

    // prende tutte le chat
    const [elencoChat, setElencoChat] = useState([]);
    const [elencoIdAmici, setElencoIdAmici] = useState([]);
    useEffect( () => {
        axios.get('http://localhost:4001/api/chat/' + localStorage.getItem('_id'), config)
        .then( res => { setElencoChat(res.data) })
        .catch( err => console.log(err.response));

        // amici
        if(listaAmici) {
            axios.get('http://localhost:4001/api/user/friendList/'+ localStorage.getItem("_id"), config)
            .then(res => { setElencoIdAmici(res.data) })
            .catch(err => console.log(err.response));
        }
    }, [listaAmici/*, elencoChat, elencoIdAmici*/]) // BOOOOOOOOOOM

    return (
        <Container fluid className="d-flex flex-column flex-shrink-1" id="left-container">
            <Head amici={listaAmici} handleAmici={handleListaAmici} handleAggiungiAmico={handleAggiungiAmico}/>
            <ListaChat lista={listaAmici ? elencoIdAmici : elencoChat} amici={listaAmici} handleChatAperta={handleChatAperta} />
        </Container>
    )
}