import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";
export const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null)
  const navigate = useNavigate ();

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
      friends:[]

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
        }else{
            setError('Existing User')
        }
      });

  }
  return (
    <div className='container-fluid m-0 p-0 login-wrapper d-flex justify-content-center align-items-center'>
      <form className='login-rectangle d-flex flex-column justify-content-between'>
        <div className='input-wrapper mt-4 me-4 ms-4 mb-3'><input className='input' type="name" placeholder='Name' onChange={nameHandler} /></div>
        <div className='input-wrapper me-4 ms-4 mb-3'><input className='input' type="name" placeholder='Surname' onChange={surnameHandler} /></div>
        <div className='input-wrapper me-4 ms-4 mb-3'><input className='input' type="email" placeholder='Email' onChange={emailHandler} /></div>
        <div className='input-wrapper me-4 ms-4 mb-3'><input className='input' type="password" placeholder='Password' onChange={passwordHandler} /></div>
       {error != null && <div className='text-danger d-flex justify-content-center mb-2'>{error}</div>}
        <div className='d-flex justify-content-center align-items-center me-4 ms-4 mb-3'><button onClick={registerHandler} className='login-register-button'>Register</button></div>
      </form>
    </div>
  )
}
