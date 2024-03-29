import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Image, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';


export default function Amico({ amico, handleChatAperta, updateListaAmici, setElencoIdAmici, elencoIdAmici, setIsChatAperta }) {

  // header token
  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

  // PARAMETRI DATA PER IMPOSTARE IL GIUSTO ORARIO E GIORNO DEL MESSAGGIO
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  
  let month = today.getUTCMonth() + 1; //months from 1-12
  let day = today.getUTCDate();
  let year = today.getUTCFullYear();

  // prendere messaggi
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
        .get("http://localhost:4001/api/chat/find/" + amico._id + "/" + localStorage.getItem("_id"))
        .then((res) => {
            if (res.data) {
              axios
              .get("http://localhost:4001/api/messages/" + res.data._id, config)
              .then((res) => setMessages(res.data))
              .catch((err) => console.log(err.response));
            }
        })
      .catch((err) => console.log(err.response));
  }, []);
  
  function eliminaAmico(){

  //CODICE PER ELIMINARE AMICO
  axios.put("http://localhost:4001/api/user/removeFriend/" + amico._id, {}, config)
    .then( res => {
        //CODICE PER ELIMINARE AMICO DALLA LISTA CHAT AMICI
        //console.log("amico eliminato");
        setElencoIdAmici(elencoIdAmici.filter(el => el !== amico._id))
        updateListaAmici(amico);
    })
    .catch( err => {
        console.log(err);
    });

  }

  return (
    <li className="list-group-item d-flex p-1" aria-current="true" onClick={(e) => {handleChatAperta(e, amico); setIsChatAperta(true)}}>
      {/* immagine IMG-DIV */}
      <div className="container img-div m-1 text-center">
        <Image
          src={amico.profilePic}
        />
      </div>

      {/* username e messaggio USER-MSG-DIV */}
      <div className="container user-msg-div p-0">
        <h5 className="username-chat mt-2 text-start px-2">{amico.username}</h5>
        <p className="messaggio-chat m-0 mt-2 text-start px-2">
          {messages.length !== 0 && messages[messages.length - 1].text}
        </p>
        
      </div>

      {/* orario e non letti DETAILS-DIV */}
      <div className="container details-div p-0">
        <Button id="chiudiWindow" className="input-group-text buttonEliminaAmico" onClick={e => {
          e.stopPropagation();
          eliminaAmico();
          }}>
          <FontAwesomeIcon icon={faXmarkCircle} style={{color:'red'}}/>
        </Button>
        <div className="position-absolute bottom-0 end-0 m-2">
          <p className="paragraph block time m-0"> {messages.length !== 0 ? ((day == messages[messages.length - 1].updatedAt.substring(8, 10) && month == messages[messages.length - 1].updatedAt.substring(5, 7) && year == messages[messages.length - 1].updatedAt.substring(0, 4)) ? "oggi " + messages[messages.length - 1].updatedAt.substring(11, 16) :
          messages[messages.length - 1].updatedAt.substring(8, 10) + "/" + messages[messages.length - 1].updatedAt.substring(5, 7) + " " + messages[messages.length - 1].updatedAt.substring(11, 16)) : "" } </p>
        </div>
      </div>
    </li>
  );
}