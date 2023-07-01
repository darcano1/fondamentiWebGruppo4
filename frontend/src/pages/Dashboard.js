import React from 'react';
import './Dashboard.css'
import { Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from '../components/Dashboard/Left/LeftContainer'
import RightContainer from '../components/Dashboard/Right/RightContainer'
import WindowAggiuntaAmico from '../components/Dashboard/Left/WindowAggiuntaAmico.js';

export default function Dashboard()  {

    const config = { headers:
      {"x-access-token": localStorage.getItem("token")}
  }

  const [chatAperta, setChatAperta] = useState(false);
  const [contenutoChatAperta, setContenutoChatAperta] = useState([]);
  const [aggiuntaAmico, setAggiuntaAmico] = useState(false);

  function handleAggiungiAmico(){
    // Logica per div in sovraimpressione
    setAggiuntaAmico(!aggiuntaAmico);
  }

  function handleChatAperta(e, amico) { 
    e.preventDefault();
    setChatAperta(amico);

    // Richiede l'id della chat con l'utente selezionato
    axios.get('http://localhost:4001/api/chat/find/' + localStorage.getItem('_id') + '/' + amico._id, config)
      .then(res => { 
        //console.log("res " + res.data);
  
        // Richiede i messaggi della chat con l'utente selezionato
        axios.get('http://localhost:4001/api/messages/' + res.data._id, config)
          .then(res => { 
            handleContenutoChatAperta(res.data);
            console.log(res);
            // console.log("Ricevuti messaggi: " + res.data[0]); 
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err.response));
  };
  
  function handleContenutoChatAperta(data) {
      setContenutoChatAperta(data);
      //console.log("Messaggi" + data);
  }

  return (
    <>     
    {aggiuntaAmico && <WindowAggiuntaAmico handleAggiungiAmico={handleAggiungiAmico}/>}
    <Container fluid className="d-flex flex-row p-0 justify-content-center" id="all-container">
      <LeftContainer handleChatAperta={handleChatAperta} handleAggiungiAmico={handleAggiungiAmico}/>
      <RightContainer chatAperta={chatAperta} contenutoChatAperta={contenutoChatAperta}/>
    </Container>
    </>   
  )

};
