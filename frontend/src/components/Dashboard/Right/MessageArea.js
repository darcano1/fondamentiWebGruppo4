import React from 'react';
import { Container } from 'react-bootstrap';

export default function MessageArea() {
    return (
        <Container id="message-area" className="container flex-grow-1 ms-2 my-3 px-4">
            <div className="message my-message">
                <p className="shadow-sm">Ciao, come stai?<span className="paragraph block time m-0">11.24</span></p>
            </div>
    
            <div className="message friend-message">
                <p className="shadow-sm">Bene, tu?<span className="paragraph block time m-0">11.24</span></p>
            </div>
      </Container>
    );
}