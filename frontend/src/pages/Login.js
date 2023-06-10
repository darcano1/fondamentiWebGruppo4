import { useState } from "react";
import './Login.css';
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginRegister from '../components/Login/LoginRegister'
import LoginForm from '../components/Login/LoginForm'
import RegisterForm from '../components/Login/RegisterForm'

const Login = () => {
  
  const navigate = useNavigate();

    // handle signin
  function handleSubmitSignin(e) {
    e.preventDefault();
    //Autenticazione API
    navigate("/dashboard");
  };
  
  // handle singup
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    //Autenticazione API
    navigate("/dashboard");
  };

    // true -> login, false -> register
  const [alreadyRegistered, setAlreadyRegistered] = useState(true)
  function handleAlreadyRegistered() {
    setAlreadyRegistered(!alreadyRegistered);
  }
  
  return (
    <div id="login-page">
      <div id="login-div">
        <div id="login">

          <div id="benvenuto">
            <div id="benvenuto-elements">
              <h1> Benvenuto su Whatsapp!</h1>
              <p> Accedi al tuo account e connettiti con i tuoi amici in tempo reale</p>
            </div>
          </div>
          <div id="divForm">
            <div id="form" className="col-lg-8 col-xs-12 col-centered">
              <LoginRegister login={alreadyRegistered} func={handleAlreadyRegistered} />

              {alreadyRegistered ? <LoginForm handleSubmit={handleSubmitSignin} /> : <RegisterForm handleSumbit={handleSubmitSignup} />}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
};

export default Login;