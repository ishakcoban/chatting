import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SendMessageSection } from '../components/SendMessageSection';
import { ChatList } from '../components/ChatList';
import { MessageLeft } from '../components/messages/MessageLeft';
import { MessageRight } from '../components/messages/MessageRight';
import chatPage from '../images/chatPage.png';
import formatAMPM from '../actions/FormatDate';
import { MessageActions } from '../store/slices/Message';
import { Popup } from '../components/Popup';
import $ from 'jquery';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
export const Chat = () => {
  const [show, setShow] = useState(null)
  const [chosen, setChosen] = useState([])
  const [allMessages, setAllmessages] = useState(null)
  const [allChatList, setAllChatList] = useState([])
  const id = useSelector((state) => state.auth.userID);
  const msg = useSelector((state) => state.message.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (document.querySelector('#messageBody')) {
      var messageBody = document.querySelector('#messageBody');
      //console.log("girdi " + messageBody.scrollTop + " " + messageBody.scrollHeight)
      messageBody.scrollTop = messageBody.scrollHeight;

    }
  }, [msg,allChatList])
  /*****************************Chat List************************************ */
  useEffect(() => {
    //console.log(allMessages)

    let values = {
      "id": id
    }
    fetch("http://localhost:8080/api/participant/getAllChatList/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllChatList(data)
        //setAllmessages([])
        //console.log(data)
        //setAllmessages(null)

      });

  }, [msg])


  return (
    <div className="container-fluid m-0 p-0 chat-wrapper">
      <div className='row m-0 p-0'>

        <div className='col-4 col-sm-5 col-md-4 col-lg-3 col-xl-3 chat-left-section m-0 p-0 d-flex flex-column justify-content-start'>

          <div id='flwrapper' className='friend-list-wrapper '>

            {allChatList != null && allChatList.length != null && allChatList.map((e) => {
              return <div className='chat-list-wrapper-anim'>
                <div className='chat-list-wrapper hver' key={e.id} onClick={(m) => {
                  
                  /*let Sock = new SockJS('http://localhost:8080/ws');
                  stompClient = over(Sock);
                  stompClient.connect({},onConnected, onError);*/
                  
                  $(".chat-list-wrapper").removeClass("chatlist-bg")
                  m.currentTarget.classList.add('chatlist-bg')
                  $(".chat-list-wrapper").addClass("hver")
                  m.currentTarget.classList.remove('hver')

                  e.participants.forEach(element => {
                    if (element.id != id) {
                      setAllmessages(element.id);
                      //console.log(element.id)
                    }
                  });
                  setShow(true);
                  dispatch(MessageActions.changeState())
                }
                }><ChatList eachData={e}></ChatList></div></div>
            })}

          </div>

        </div>

        <div className='col-8 col-sm-7 col-md-8 col-lg-9 col-xl-9 chat-right-section m-0 p-0' >

          {show && <div id="messageBody"   className='chat-right-top-section p-3'>


            {show && allChatList != null &&

              allChatList.map(m => {
                return m.participants.map(e => {
                  return e.id == allMessages ? (m.messages.map(e => {
                    return <div key={e.id}>{e.sender == id ? <MessageRight content={e.content} date={formatAMPM(new Date(e.dateTime))}></MessageRight> : <MessageLeft content={e.content} date={formatAMPM(new Date(e.dateTime))}></MessageLeft>}</div>})) : null})})
              }
             



          </div>}

          {show && <div><SendMessageSection participant={allMessages}></SendMessageSection></div>}
          {!show && <div className='chatpage-img-wrapper'><img className='chatpage-img' src={chatPage}></img></div>}

        </div>

        <Popup></Popup>

      </div>
    </div>

  )
}
