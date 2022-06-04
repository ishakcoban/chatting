import React, { useEffect, useId, useState } from 'react'

export const SendMessageSection = (props) => {
  const [message, setMessage] = useState("")
  const [inputValue, setInputValue] = useState("")
  const sendingMessage = (e)=>{

    let values ={
      "content" :message
    }
    fetch("http://localhost:8080/api/message/send/" + props.Uid + "/" +  props.FId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    

  }

const typeHandler = (e)=>{
  setMessage(e.target.value)
  
}


  
  return (
    <div className='right-sending-message-section row p-0 m-0 d-flex justify-content-center align-items-center'>
            <div className='col-9'><input className='input-send-message ' type="text" placeholder='Type a message' onChange={typeHandler}/></div>
            <div className='col-3 d-flex justify-content-center'><button onClick={sendingMessage} className='login-register-button sending-message-button'>Send</button></div>
          </div>
  )
}
