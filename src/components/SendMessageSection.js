import React, { useEffect, useId, useState } from 'react'
import emoji from "../images/emoji.png";
import send from "../images/send.png";
import { useSelector,useDispatch } from "react-redux";
import { MessageActions } from '../store/slices/Message';
const emojis = require('emojis-list')
// console.log(emojis)
export const SendMessageSection = (props) => {
  const [message, setMessage] = useState("")
  const [emj, setEmj] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const id = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  const sendingMessage = (e) => {

    let values = {
      "participants": [id, "629728a2f8b14a7c7585ed48"],
      "messages": [{
        "sender": id,
        "content": message
      }]
    }
    fetch("http://localhost:8080/api/participant/send/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(MessageActions.changeState())
        setMessage("")
      });

      
  }

  const typeHandler = (e) => {
    setMessage(e.target.value)
    
    

  }

  return (
    <div className='right-sending-message-section row p-0 m-0 d-flex justify-content-center align-items-center me-2 ms-2'>
      <div className='col-1 d-flex justify-content-center'><img className='emoji-img' src={emoji}></img></div>
      <div className='col-9'><input className='input-send-message d-flex flex-wrap' type="text" placeholder='Type a message' onChange={typeHandler} value={message}/></div>
      <div className='col-2 d-flex justify-content-center'><button disabled={message.length == 0 ? true: false} onClick={sendingMessage} className={message.length == 0 ? 'login-register-button sending-message-button d-flex align-items-center justify-content-center bg-secondary':'login-register-button sending-message-button d-flex align-items-center justify-content-center'}><img className='sending-message-button-img' src={send}></img></button></div>
    </div>
  )
}
