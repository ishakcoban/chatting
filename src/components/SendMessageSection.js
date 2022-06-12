import React, { useEffect, useId, useState } from 'react'
import emoji from "../images/emoji.png";
import send from "../images/send.png";
const emojis = require('emojis-list')
    console.log(emojis)
export const SendMessageSection = (props) => {
  const [message, setMessage] = useState("")
  const [emj, setEmj] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const sendingMessage = (e) => {
    
    let values = {
      "content": message
    }
    fetch("http://localhost:8080/api/message/send/" + props.Uid + "/" + props.FId, {
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

  const typeHandler = (e) => {
    setMessage(e.target.value)

  }

  const emojiHandler = ()=>{

    setEmj(!emj)
  }


  return (
    <div className='right-sending-message-section row p-0 m-0 d-flex justify-content-center align-items-center me-2 ms-2'>
      {emj && <div>asdsadasdasds</div>}
    <div className='col-1 d-flex justify-content-center'><img className='emoji-img' src={emoji} onClick={emojiHandler}></img></div>
      <div className='col-8'><input className='input-send-message ' type="text" placeholder='Type a message' onChange={typeHandler} /></div>
      <div className='col-3 d-flex justify-content-center'><button onClick={sendingMessage} className='login-register-button sending-message-button d-flex align-items-center justify-content-center'><img className='sending-message-button-img' src={send}></img></button></div>
    </div>
  )
}
