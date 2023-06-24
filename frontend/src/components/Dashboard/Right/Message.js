import React from 'react';
import { Container } from 'react-bootstrap';

export default function Message({classe, testo, orarioInvio}) {

    return (
        <div className="message my-message">
                <p className="shadow-sm">test<span className="paragraph block time m-0">test</span></p>
        </div>
    );
}