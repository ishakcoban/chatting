import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from '../store/slices/Auth';
import { BackgroundTemplate } from '../components/BackgroundTemplate';
import { AuthenticationCard } from '../components/AuthenticationCard';
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const Auth = useSelector((state) => state.auth.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  var headers= {"Content-Type": "application/json",}
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  headers['Access-Control-Request-Method'] = '*'
  headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

  useEffect(() => {
    dispatch(AuthActions.logout());
  }, [])
  
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
        //console.log(data)
        if (data.status != 500) {
          dispatch(AuthActions.login(data.id));
          navigate('/home');
        } else {
          setError('Wrong email or password')
        }
      });

  }

  const registerHandler = ()=>{
    navigate("/register")
  }

  return (
    <BackgroundTemplate>
      <div className='logo-wrapper'>Chattin'</div>
      <AuthenticationCard authInfo = 'login-register-card col-8 col-sm-5 col-md-4 col-lg-3 col-xl-3'>
        <div><input className='input p-2' placeholder='email' onChange={emailHandler}></input></div>
        <div className='mt-3'><input className='input p-2' placeholder='password' onChange={passwordHandler} type="password"></input></div>
        <div className='d-flex justify-content-center mt-3'><button className='log-reg-button px-5 pt-2 pb-2' onClick={loginHandler}>Login</button></div>
        <div className="d-flex justify-content-end mt-3"><span onClick={registerHandler} className='log-register-link'>Register</span></div>
      </AuthenticationCard>
    </BackgroundTemplate>

  )
}
