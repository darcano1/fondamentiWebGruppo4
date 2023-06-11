import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import Head from "./Head";
import ListaChat from "./ListaChat";


export default function LeftContainer() {

    const config = { headers:
        {"x-access-token": localStorage.getItem("token")}
    }
    

    // prende tutte le chat
    let elencoChat = [];
    useEffect( () => {
        axios.get('http://localhost:4001/api/chat/' + localStorage.getItem('_id'), config)
        .then( chat => {elencoChat.push(chat.data)})
        .catch( err => console.log(err.response));
    }, [])

    // prende tutte le chat degli AMICI
    let elencoChatAmici = [];
    async function getFriendChat() {
        axios.get('http://localhost:4001/api/user/friendList/'+ localStorage.getItem("_id"), config)
        .then(res => {
            elencoChat= [];
            res.data.map( secondId => {
                axios.get('http://localhost:4001/api/chat/find/' + localStorage.getItem('_id') + '/' + secondId, config)
                .then( chat => {elencoChatAmici.push(chat.data)})
                .catch( err => console.log(err.response));
            })
        })
        .catch(err => console.log(err.response));
    }

    return (
        <Container fluid className="d-flex flex-column flex-shrink-1" id="left-container">
            <Head />
            <ListaChat lista={elencoChat} />
        </Container>
    )
}