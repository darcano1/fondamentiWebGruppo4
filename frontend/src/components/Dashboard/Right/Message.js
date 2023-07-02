import React from 'react';
import { Container } from 'react-bootstrap';

export default function Message({classe, id, testo, orarioInvio}) {

    return (
        <div className={"message " + classe} id={id}>
                <p className="shadow-sm px-2">{testo}<span className="paragraph block time m-0">{orarioInvio !== "" && orarioInvio.substring(8, 10) + "/" + orarioInvio.substring(5, 7) + " " + orarioInvio.substring(11, 16)}</span></p>
        </div>
    );
}