import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Image, Badge } from "react-bootstrap";

export default function Amico({ amico }) {

    // prendere messaggi
    const [messages, setMessages] = useState([]);
    useEffect( () => {
        axios
        .get("http://localhost:4001/api/messages/" + amico._id)
        .then( res => (setMessages(res.data)))
        .catch( err => console.log(err.response));
    }, []);

    return (
        <li className="list-group-item d-flex p-1" aria-current="true">

          {/* immagine IMG-DIV */}
          <div className="container img-div m-1 text-center">
            <Image
              alt={"immagine di profilo di" + amico.username}
              src={amico.profilePic}
            />
          </div>
    
          {/* username e messaggio USER-MSG-DIV */}
          <div className="container user-msg-div p-0">
            <h5 className="username-chat mt-2 text-start">{amico.username}</h5>
            <p className="messaggio-chat m-0 mt-2">
                { messages.length > 0 ? messages[ messages.length-1 ] : null }
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