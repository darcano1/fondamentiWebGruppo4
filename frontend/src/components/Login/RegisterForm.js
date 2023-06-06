import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import '../../App.css';

export default function RegisterForm({ handleSubmit }) {

  // controllo password onKeyDown
  const [check, setCheck] = useState(false) // F->combaciano | T->non combaciano
  
  function checkEverPassword() {
    console.log("eseguito")
    if (document.getElementById("register-form").repeatpsw.value !== "") {
      setTimeout(()=> {
        const psw = document.getElementById("register-form").psw.value;
        const repeatpsw = document.getElementById("register-form").repeatpsw.value;
        setCheck(repeatpsw !== psw)
        console.log("eseguito fine timer")}, 1000); // timeout 1s
      }
  }

  
  function checkPassword(e) {
    console.log("test");
    e.preventDefault();
    return 0;
  }
  
  return (
    <div id="register">
        <Form id="register-form">

          {/** USERNAME */}
          <Form.Group className="mb-3">
            <Form.Control className="inputForm" type="text" placeholder="Username" required/>
          </Form.Group>

          {/** EMAIL */}
          <Form.Group className="mb-3">
            <Form.Control className="inputForm" type="text" placeholder="name@example.com" required/>
          </Form.Group>

          {/** PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Control name="psw" className="inputForm" type="password" placeholder="Password" onKeyUp={checkEverPassword} required/>
          </Form.Group>

          {/** REPEAT PASSWORD */}
          <Form.Group className="mb-3">
            {check ? <Form.Floating style={{color:"red"}}>Le password devono coincidere</Form.Floating> : <></>}
            <Form.Control name="repeatpsw" className="inputForm" type="password" placeholder="Ripeti password" onKeyUp={checkEverPassword} required/>
          </Form.Group>

          {/** SUBMIT */}
          <Form.Group className="formButton">
            <Form.Control id="btn-signin" type="submit" className="btn btn-primary inputForm" value="SIGN IN"/>
          </Form.Group>
          
        </Form>
    </div>
  )
}