import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from '../store/Auth';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null)
  const navigate = useNavigate ();
  const dispatch = useDispatch();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const values = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status != 500) {
          dispatch(AuthActions.login(data.id));
          navigate('/home');
        }else{
            setError('Wrong email or password')
        }
      });

  }
  return (
    <div className='container-fluid m-0 p-0 login-wrapper d-flex justify-content-center align-items-center'>
      <form className='login-rectangle d-flex flex-column justify-content-between'>
        <div className='input-wrapper mt-4 me-4 ms-4 mb-3'><input className='input' type="email" placeholder='Email' onChange={emailHandler}/></div>
        <div className='input-wrapper me-4 ms-4 mb-3'><input className='input' type="password" placeholder='Password' onChange={passwordHandler} /></div>
        {error != null && <div className='text-danger d-flex justify-content-center mb-2'>{error}</div>}

        <div className='d-flex justify-content-center align-items-center me-4 ms-4 mb-3 mt-2'><button onClick={loginHandler} className='login-register-button'>Login</button></div>
        <div className='d-flex justify-content-end  me-4 ms-4 login-a'><Link to='/register'>Register</Link></div>
      </form>

    </div>

  )
}
