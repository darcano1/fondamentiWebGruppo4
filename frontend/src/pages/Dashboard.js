import React from 'react';
import './Dashboard.css'
import { Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from '../components/Dashboard/Left/LeftContainer'
import RightContainer from '../components/Dashboard/Right/RightContainer'
import WindowAggiuntaAmico from '../components/Dashboard/Left/WindowAggiuntaAmico.js';
import WindowCambioImmagineProfilo from '../components/Dashboard/Left/WindowCambioImmagineProfilo.js';

export default function Dashboard()  {

    const config = { headers:
      {"x-access-token": localStorage.getItem("token")}
  }

  const [chatAperta, setChatAperta] = useState(false);
  const [isChatAperta, setIsChatAperta] = useState(false);
  const [contenutoChatAperta, setContenutoChatAperta] = useState([]);
  const [aggiuntaAmico, setAggiuntaAmico] = useState(false);
  const [cambioImmagineProfilo, setCambioImmagineProfilo] = useState(false);

  function handleAggiungiAmico(){
    // LOGICA PER DIV IN SOVRAIMPRESSIONE
    setAggiuntaAmico(!aggiuntaAmico);
  }

  function handleCambiaImmagineProfilo(){
    // LOGICA PER DIV IN SOVRAIMPRESSIONE
    setCambioImmagineProfilo(!cambioImmagineProfilo);
  }

  function handleChatAperta(e, amico) { 
    e.preventDefault();
    setChatAperta(amico);
    setContenutoChatAperta([]);
    // RICHIEDE L'ID DELLA CHAT CON L'UTENTE SELEZIONATO
    axios.get('http://localhost:4001/api/chat/find/' + localStorage.getItem('_id') + '/' + amico._id, config)
      .then(res => { 
        //console.log("res " + res.data);
  
        // Richiede i messaggi della chat con l'utente selezionato
        axios.get('http://localhost:4001/api/messages/' + res.data._id, config)
          .then(res => { 
            handleContenutoChatAperta(res.data);
            // console.log("Ricevuti messaggi: " + res.data[0]); 
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err.response));
  };
  
  // AGGIORNA LO STATO CHE CONTIENE TUTTI I DATI DELLA CHAT
  function handleContenutoChatAperta(data) {
      setContenutoChatAperta(data);
      //console.log("Messaggi" + data);
  }

  // CHIUDE LA CHAT PREMENDO ESC
  document.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.keyCode == 27) {
      setIsChatAperta(false);
    }
  })

  return (
    <>     
    {aggiuntaAmico && <WindowAggiuntaAmico handleAggiungiAmico={handleAggiungiAmico} setAggiuntaAmico={setAggiuntaAmico}/>}
    {cambioImmagineProfilo && <WindowCambioImmagineProfilo handleCambiaImmagineProfilo={handleCambiaImmagineProfilo} setCambioImmagineProfilo={setCambioImmagineProfilo}/>}
    <Container fluid className="d-flex flex-row p-0 justify-content-center" id="all-container">
      <LeftContainer handleChatAperta={handleChatAperta} handleAggiungiAmico={handleAggiungiAmico} handleCambiaImmagineProfilo={handleCambiaImmagineProfilo} aggiuntaAmico={aggiuntaAmico} setIsChatAperta={setIsChatAperta}/>
      <RightContainer chatAperta={chatAperta} contenutoChatAperta={contenutoChatAperta} isChatAperta={isChatAperta} setIsChatAperta={setIsChatAperta}/>
    </Container>
    </>   
  )

};
