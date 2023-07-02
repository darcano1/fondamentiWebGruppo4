import React, { useState } from "react";
import { useEffect } from "react";
import { Image, Badge } from "react-bootstrap";
import axios from "axios";

export default function Chat({ chat, handleChatAperta, amici, date }) {
  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

  // prende messaggi e dati utenti per la chat
  const [utente, setUtente] = useState("");
  const [lastMessage, setLastMessage] = useState({text: "", orario: ""});

  useEffect(() => {
    
      // Carica i dati dell'utente
      console.log(chat);
      axios.get("http://localhost:4001/api/user/profile/" + (chat.members[0] === localStorage.getItem("_id") ? chat.members[1] : chat.members[0]), config)
        .then( res => {
          setUtente(res.data);
          
          // Richiede l'id della chat con l'utente selezionato
          axios.get('http://localhost:4001/api/chat/find/' + localStorage.getItem('_id') + '/' + res.data._id, config)
          .then(res => { 

            // Richiede i messaggi della chat con l'utente selezionato
            axios.get('http://localhost:4001/api/messages/lastmessage/' + res.data._id, config)
              .then(res => {         
                setLastMessage({text: res.data[0].text, orario: res.data[0].updatedAt}); 
              })
              .catch(err => console.log(err.response));
          })
          .catch(err => console.log(err.response));
        })
        .catch( err => console.log(err.response));

  }, []);

  return (

    <li className="list-group-item d-flex p-1" aria-current="true"  onMouseDown={(e) => {handleChatAperta(e, utente); console.log(utente)}}>

      {/* immagine IMG-DIV */}
      <div className="container img-div m-1 text-center">
        <Image
          alt={utente.username}
          src={utente.profilePic}
        />
      </div>

      {/* username e messaggio USER-MSG-DIV */}
      <div className="container user-msg-div p-0">
        <h5 className="username-chat mt-2 text-start px-2">{utente.username}</h5>
        <p className="messaggio-chat m-0 mt-2 text-start px-2">
          {lastMessage.length !== 0 && lastMessage.text}
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
          <p className="paragraph block time m-0"> {(date.day == lastMessage.orario.substring(8, 10) && date.month == lastMessage.orario.substring(5, 7) && date.year == lastMessage.orario.substring(0, 4)) ? "oggi " + lastMessage.orario.substring(11, 16) : (lastMessage.orario.substring(8, 10) + "/" + lastMessage.orario.substring(5, 7) + " " + lastMessage.orario.substring(11, 16))} </p> 
        </div>
      </div>
    </li>
  );
}
