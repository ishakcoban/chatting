import React, { useState } from 'react'
import { AuthenticationCard } from '../components/AuthenticationCard';
import { BackgroundTemplate } from '../components/BackgroundTemplate';
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  return (
    <BackgroundTemplate>
      <div className='logo-wrapper'>Chattin'</div>
      <AuthenticationCard authInfo='forgotPassword-card col-12 col-sm-10 col-md-10 col-lg-8 col-xl-5'>
        <div className='d-flex justify-content-between'>
          <div className='w-75'><input className='forgotPassword-input' placeholder='Email' onChange={emailHandler}></input></div>
          <button className='log-reg-button px-3' >Send code</button>
        </div>
      </AuthenticationCard>
    </BackgroundTemplate>
  )
}
