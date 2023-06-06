import { useState } from "react";
import '../App.css';
import Dashboard from './Dashboard.js'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginRegister from '../components/Login/LoginRegister'
import LoginForm from '../components/Login/LoginForm.js'
import RegisterForm from '../components/Login/RegisterForm.js'

const Login = () => {

  // true -> login, false -> register
  const [alreadyRegistered, setAlreadyRegistered] = useState(true)
  function handleAlreadyRegistered() {
    setAlreadyRegistered(!alreadyRegistered);
  }

  // handle submit
  function handleSubmitSignin(e) {
    e.preventDefault()
    return 0;
  }

  // handle submit
  function handleSubmitSignup() {
    return 0;
  }
  
  /*const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ username: "Jane", password: "testpassword" }];*/ // test
  const navigate = useNavigate();
  
  //Richiesta al server autenticazione
  const handleSubmit = (e) => {
    e.preventDefault();
    //Autenticazione API
    navigate("/dashboard");
  };
  
  return (
    <div id="login">
      
      <div id="benvenuto">
        <h1> Benvenuto su Whatsapp!</h1>
        <p> Accedi al tuo account e connettiti con i tuoi amici in tempo reale! </p>
      </div>
      
      <div id="form">
        <LoginRegister login={alreadyRegistered} func={handleAlreadyRegistered} />
        
        {alreadyRegistered ? <LoginForm handleSumbit={handleSubmitSignin}/> : <RegisterForm handleSumbit={handleSubmitSignup}/>}
        

      </div>

    </div>
    
  )
};

export default Login;