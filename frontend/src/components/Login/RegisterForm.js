import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function RegisterForm({ handleSubmit, messaggioServer }) {

  // controllo password onKeyDown
  const [check, setCheck] = useState(false) // F->combaciano | T->non combaciano
  
  function checkEverPassword(e) {
    if (document.getElementById("register-form").repeatpsw.value !== "" && e.keyCode !== 13) {
      setTimeout(()=> {
        const psw = document.getElementById("register-form").psw.value;
        const repeatpsw = document.getElementById("register-form").repeatpsw.value;
        setCheck(repeatpsw !== psw)}, 1000); // timeout 1s
      }
  }

  return (
    <div id="register">
        <Form id="register-form" onSubmit={handleSubmit} >

          {/** USERNAME */}
          <Form.Group className="mb-3">
            <Form.Control name="username" className="inputForm" type="text" placeholder="Username"/>
          </Form.Group>

          {/** EMAIL */}
          <Form.Group className="mb-3">
            <Form.Control name="email" className="inputForm" type="email" placeholder="name@example.com"/>
          </Form.Group>

          {/** PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Control name="psw" className="inputForm" type="password" placeholder="Password" onKeyUp={checkEverPassword}/>
          </Form.Group>

          {/** REPEAT PASSWORD */}
          <Form.Group className="mb-3">
            {check ? <Form.Floating className='mb-1' style={{color:"red"}}>Le password devono coincidere</Form.Floating> : <></>}
            <Form.Control name="repeatpsw" className="inputForm" type="password" placeholder="Ripeti password" onKeyUp={checkEverPassword}/>
          </Form.Group>

          {/** SUBMIT */}
          <Form.Group className="formButton">
            {messaggioServer !== '' ? <Form.Floating className='mb-3' style={{color: 'red', fontSize: "1.1rem"} }>{messaggioServer}</Form.Floating> : null}
            <Form.Control id="btn-signin" type="submit" className="btn btn-primary inputForm" value="Sign up"/>
          </Form.Group>
          
        </Form>
    </div>
  )
}