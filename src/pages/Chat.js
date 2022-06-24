import React, { useEffect, useState } from 'react'
import { Message } from '../components/Message'
import { MessageWrapper } from '../components/MessageWrapper'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { SendMessageSection } from '../components/SendMessageSection';
import { FriendsList } from '../components/FriendsList';
import { FlowButton } from '../components/buttons/FlowButton';
import { ChatList } from '../components/ChatList';
import { MessageLeft } from '../components/messages/MessageLeft';
import { MessageRight } from '../components/messages/MessageRight';
import chatPage from '../images/chatPage.png';
import { MessageActions } from '../store/slices/Message';

import { Popup } from '../components/Popup';
export const Chat = () => {
  const [show, setShow] = useState(false)
  const [allMessages, setAllmessages] = useState(false)
  const [sendMessageStatus, setSendMessageStatus] = useState(false)
  const id = useSelector((state) => state.auth.userID);
  const msg = useSelector((state) => state.message.message);
  const navigate = useNavigate();
  useEffect(() => {
    if (document.querySelector('#messageBody')) {
      var messageBody = document.querySelector('#messageBody');
      console.log("girdi " + messageBody.scrollTop + " " + messageBody.scrollHeight)
      messageBody.scrollTop = messageBody.scrollHeight;

    }
  }, [allMessages])


  /*if (document.querySelector('#messageBody')) {
    var messageBody = document.querySelector('#messageBody');
    console.log("girdi " + messageBody.scrollTop + " " +  messageBody.scrollHeight)
    messageBody.scrollTop = messageBody.scrollHeight;
    
  }*/

  useEffect(() => {
    let values = {
      "participants": ["62a495e1e0d6df4c7e17136d", "629728a2f8b14a7c7585ed48"]
    }
    fetch("http://localhost:8080/api/participant/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {

        setAllmessages(data.messages)
        console.log(data.messages)
      });
    console.log(msg)
  }, [msg])
  /***************************************************************** */

  return (
    <div className="container-fluid m-0 p-0 chat-wrapper">
      <div className='row m-0 p-0'>

        <div className='col-3 chat-left-section m-0 p-0 d-flex flex-column justify-content-start'>

          <div className='friend-list-wrapper'>
            
            {allMessages.length != null && allMessages.map((e) => {
              return <div key={e.id} onClick={() => { setShow(true) }}><ChatList></ChatList></div>
            })}

          </div>

        </div>

        <div className='col-9 chat-right-section m-0 p-0' >
          {show && <div id="messageBody" className='chat-right-top-section p-3'>

            {allMessages.length != null && allMessages.map((e) => {
              return <div key={e.id}>{e.sender == id ? <MessageRight content={e.content} date={e.dateTime}></MessageRight> : <MessageLeft content={e.content} date={e.dateTime}></MessageLeft>}</div>
            })}

          </div>}

          {show && <div ><SendMessageSection></SendMessageSection></div>}
          {!show && <div className='chatpage-img-wrapper'><img className='chatpage-img' src={chatPage}></img></div>}

        </div>

        <Popup></Popup>

      </div>
    </div>

  )
}
