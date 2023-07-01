import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup, Image, Badge } from "react-bootstrap";
import axios from "axios";

export default function Chat({ chat, handleChatAperta }) {
  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

  // prende messaggi e dati utenti per la chat
  const [utente, setUtente] = useState({});
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState({text: "no-message"});

  useEffect(() => {
    
    async function getUser(id) {
      axios
        .get("http://localhost:4001/api/user/profile/" + id, config)
        .then( res => setUtente(res.data))
        .catch( err => console.log(err.response));
    }

    if (chat.members[0] == localStorage.getItem("_id")) {
      getUser(chat.members[1]);
    } else {
      getUser(chat.members[0]);
    }

    // Richiede l'id della chat con l'utente selezionato
    axios.get('http://localhost:4001/api/chat/find/' + localStorage.getItem('_id') + '/' + utente._id, config)
    .then(res => { 
      //console.log("res " + res.data);

      // Richiede i messaggi della chat con l'utente selezionato
      axios.get('http://localhost:4001/api/messages/' + res.data._id, config)
        .then(res => { 
          console.log("test");
          console.log(res.data);
          setMessages(res.data);
          setLastMessage({text: res.data.text})
          console.log(messages);
          // console.log("Ricevuti messaggi: " + res.data[0]); 
        })
        .catch(err => console.log(err.response));
    })
    .catch(err => console.log(err.response));

  }, []);

  return (

    <li className="list-group-item d-flex p-1" aria-current="true"  onClick={(e) => {handleChatAperta(e, utente); console.log(utente)}}>

      {/* immagine IMG-DIV */}
      <div className="container img-div m-1 text-center">
        <Image
          alt={utente.username}
          src={utente.profilePic}
        />
      </div>

      {/* username e messaggio USER-MSG-DIV */}
      <div className="container user-msg-div p-0">
        <h5 className="username-chat mt-2 text-start">{utente.username}</h5>
        <p className="messaggio-chat m-0 mt-2">
          {lastMessage.text}
          {messages.length !== 0 ? messages[messages.length - 1].text : <p>Ultimo messaggio</p>}
        </p>
      </div>

      {/* orario e non letti DETAILS-DIV */}
      <div className="container details-div p-0">
        {/* <div className="position-absolute top-0 end-0 m-2">
          <Badge pill variant="warning" text="dark">
            5
          </Badge>
        </div> */}
        <div className="position-absolute bottom-0 end-0 m-2">
          <p className="paragraph block time m-0"> {/*messages[messages.length - 1].updatedAt.substring(8, 10) + "/" + messages[messages.length - 1].updatedAt.substring(5, 7) + " " + messages[messages.length - 1].updatedAt.substring(11, 16)*/} </p> 
        </div>
      </div>
    </li>
  );
}
