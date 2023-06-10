import React from "react";
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';

export default function InputArea() {
    return (
        <InputGroup id="scrivi-messaggio" className="input-group ms-2 flex-shrink-1">
            <Button id="photo" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faImage} style={{color:'black'}}/></Button>
            <FormControl contentEditable="true" type="text" className="shadow-sm ps-2" placeholder="Scrivi un messaggio..." aria-label="Username" aria-describedby="" />
            <Button id="invia" className="input-group-text shadow-sm"><FontAwesomeIcon icon={faPaperPlane} style={{color:'black'}}/></Button>
      </InputGroup>
    );
}