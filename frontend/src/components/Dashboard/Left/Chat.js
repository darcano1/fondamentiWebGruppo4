import React, { useState } from "react";
import { useEffect } from "react";
import { ListGroup, Image, Badge } from "react-bootstrap";
import axios from "axios";

export default function Chat({ chat }) {
  const config = {
    headers: { "x-access-token": localStorage.getItem("token") },
  };

  // prende messaggi e dati utenti per la chat
  const [utente, setUtente] = useState({});
  const [messages, setMessages] = useState([]);

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

    // prende messaggi
    axios
      .get("http://localhost:4001/api/messages/" + chat._id)
      .then( res => {
        setMessages(res.data);
        console.log("test" + res);
      })
      .catch( err => console.log(err.response));
  }, []);

  return (
    <li className="list-group-item d-flex p-1" aria-current="true">

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
          {/* messages.length > 0 ? messages[messages.length - 1] : null */}
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
          <p className="paragraph block time m-0">AGGIUNGERE</p>
        </div>
      </div>
    </li>
  );
}
