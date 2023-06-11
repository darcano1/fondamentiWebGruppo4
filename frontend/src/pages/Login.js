import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import LoginRegister from "../components/Login/LoginRegister";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";

export default function Login() {
  const [data, setDat] = useState(null);

  // true -> login, false -> register
  const [alreadyRegistered, setAlreadyRegistered] = useState(true);

  // messaggi di errore
  const [rispostaServerLogin, setRispostaServerLogin] = useState('');
  const [rispostaServerRegister, setRispostaServerRegister] = useState('');

  const navigate = useNavigate();

  function handleAlreadyRegistered() {
    setAlreadyRegistered(!alreadyRegistered);
    setRispostaServerLogin('');
    setRispostaServerRegister('');
  }

  // handle signin
  function handleSubmitSignin(e) {
    e.preventDefault();
    axios.post("http://localhost:4001/api/auth/login", {
        email: e.target.email.value,
        password: e.target.psw.value,
      })
      .then( res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("_id", res._id);
        localStorage.setItem("username", res.username);
        localStorage.setItem("email", res.email);
        navigate('/dashboard');
      })
      .catch( err => {setRispostaServerLogin(err.response.data)});
  }

  // handle singup
  function handleSubmitSignup(e) {
    e.preventDefault();

    //Autenticazione API
    axios.post("http://localhost:4001/api/auth/register", {
        email: e.target.email.value,
        password: e.target.psw.value,
        username: e.target.username.value
      })
      .then( res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("_id", res._id);
        localStorage.setItem("username", res.username);
        localStorage.setItem("email", res.email);
        navigate("/dashboard")
      })
      .catch( err => {
        console.log(err);
        setRispostaServerRegister(err.response.data);
      });
  };

  return (
    <div id="login-page">
      <div id="login-div">
        <div id="login">
          <div id="benvenuto">
            <div id="benvenuto-elements">
              <h1> Benvenuto su Whatsapp!</h1>
              <p>
                {" "}
                Accedi al tuo account e connettiti con i tuoi amici in tempo
                reale
              </p>
            </div>
          </div>
          <div id="divForm">

            {/* MAIN CONTENT */}
            <div id="form" className="col-lg-8 col-xs-12 col-centered">
              <LoginRegister
                login={alreadyRegistered}
                func={handleAlreadyRegistered}
              />

              {alreadyRegistered ? (
                <LoginForm handleSubmit={handleSubmitSignin} messaggioServer={rispostaServerLogin} />
              ) : ( 
                <RegisterForm handleSubmit={handleSubmitSignup} messaggioServer={rispostaServerRegister} />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
