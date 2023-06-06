import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../App.css';

export default function LoginRegister({login, func}) {
  return (
    <div id="login-register-div">
      <Form.Group id="login-register" className="formButton">
        
        <Form.Control id={login ? "login-register-inactive" : "login-register-active"} type="submit" disabled={login} onClick={func} className="btn btn-secondary a" value="LOGIN"/>
        <Form.Control id={!login ? "login-register-inactive" : "login-register-active"} type="submit" disabled={!login} onClick={func} className="btn btn-primary a" value="REGISTER"/>
        
      </Form.Group>
    </div>
  )
}