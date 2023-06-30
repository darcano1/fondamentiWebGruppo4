import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Image, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';


export default function Amico({ amico, handleChatAperta, updateListaAmici, setElencoIdAmici, elencoIdAmici }) {
  // header token
  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

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
                            console.log("amico eliminato");
                            setElencoIdAmici(elencoIdAmici.filter(el => el !== amico._id))
                            updateListaAmici(amico);
                        })
                        .catch( err => {
                            console.log(err);
                        });

  }
  
  //console.log(messages);

  return (
    <li className="list-group-item d-flex p-1" aria-current="true" onClick={(e) => handleChatAperta(e, amico)}>
      {/* immagine IMG-DIV */}
      <div className="container img-div m-1 text-center">
        <Image
          alt={"immagine di profilo di " + amico.username}
          src={amico.profilePic}
        />
      </div>

      {/* username e messaggio USER-MSG-DIV */}
      <div className="container user-msg-div p-0">
        <h5 className="username-chat mt-2 text-start">{amico.username}</h5>
        <p className="messaggio-chat m-0 mt-2">
          {messages.length > 0 ? messages[messages.length - 1] : null}
        </p>
        {/* AGGIUNGERE BOTTONE ELIMINAZIONE AMICO */}
        <Button id="chiudiWindow" className="input-group-text" onClick={e => {
          e.stopPropagation();
          eliminaAmico();
          }}>
          <FontAwesomeIcon icon={faXmarkCircle} style={{color:'red'}}/>
        </Button>
      </div>

      {/* orario e non letti DETAILS-DIV */}
      <div className="container details-div p-0">
        {/* <div className="position-absolute top-0 end-0 m-2">
              <Badge pill variant="warning" text="dark">
                5
              </Badge>
            </div> */}
        <div className="position-absolute bottom-0 end-0 m-2">
          <p className="paragraph block time m-0"> {/* Messaggio al posto di orario mancante */} </p>
        </div>
      </div>
    </li>
  );
}
