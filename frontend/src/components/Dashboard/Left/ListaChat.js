import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import Chat from "./Chat";
import Amico from "./Amico";

export default function ListaChat({ lista, amici, handleChatAperta, setElencoIdAmici, elencoIdAmici, setIsChatAperta }) {

    // HEADER TOKEN
    const config = {
        headers: { "x-access-token": localStorage.getItem("token") },
    };

    // PARAMETRI DATA PER IMPOSTARE IL GIUSTO ORARIO E GIORNO DEL MESSAGGIO
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
  
    let month = today.getUTCMonth() + 1; //months from 1-12
    let day = today.getUTCDate();
    let year = today.getUTCFullYear();

    let date = {day: day, month: month, year: year}

    // 'lista' è UN ELENCO DEGLI ID DEGLI AMICI
    // NE PRENDIAMO GLI USERNAME
    const [listaAmici, setListaAmici] = useState([]);

    if (amici) {
        lista.map( id => {
            axios
                .get("http://localhost:4001/api/user/profile/" + id, config)
                .then( res => { 
                    if( !listaAmici.some( e => e.username === res.data.username) ) {
                        setListaAmici([...listaAmici, res.data])} // username, mail, friendList, profilePic
                    })
                .catch( err => console.log(err.response));
        });
    }

    function updateListaAmici(amico){
        setListaAmici(listaAmici => listaAmici.filter(friend => friend._id !== amico._id));
    }

    return (
        <ul id="chat-list" className="list-group overflow-auto shadow-sm flex-grow-1 mb-2" >
        {amici
            ? listaAmici.map( amico => <Amico amico={amico} key={amico._id} handleChatAperta={handleChatAperta} updateListaAmici={updateListaAmici} setElencoIdAmici={setElencoIdAmici} elencoIdAmici={elencoIdAmici} setIsChatAperta={setIsChatAperta}/>)
            : lista.map( chatt => <Chat chat={chatt} key={chatt._id} handleChatAperta={handleChatAperta} amici={amici} date={date} setIsChatAperta={setIsChatAperta}/>)}
        </ul>
    );
}
