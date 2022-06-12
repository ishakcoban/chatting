import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BackgroundTemplate } from '../components/BackgroundTemplate';
import { LoginRegisterCard } from '../components/LoginRegisterCard';
export const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const surnameHandler = (event) => {
    setSurname(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const values = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      friends: [],
      notifications: []

    };

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != 500) {
          navigate('/');
        } else {
          setError('Existing User')
        }
      });

  }
  return (
    <BackgroundTemplate>
      <div className='logo-wrapper mt-5'>Chattin'</div>
      <LoginRegisterCard>
        <div><input className='input p-2' placeholder='name' onChange={nameHandler}></input></div>
        <div className='mt-3'><input className='input p-2' placeholder='surname' onChange={surnameHandler} ></input></div>
        <div className='mt-3'><input className='input p-2' placeholder='email' onChange={emailHandler}></input></div>
        <div className='mt-3'><input className='input p-2' placeholder='password' onChange={passwordHandler} type="password"></input></div>
        <div className='d-flex justify-content-center mt-3'><button className='log-reg-button px-5 pt-2 pb-2' onClick={registerHandler}>Register</button></div>
      </LoginRegisterCard>
    </BackgroundTemplate>
  )
}
