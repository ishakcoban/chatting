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
import { Popup } from '../components/Popup';
export const Chat = () => {
  const [allFriends, setAllFriends] = useState([]);
  const [friendid, setFriendId] = useState(null)
  const [friends, setFriends] = useState([])
  const [show, setShow] = useState(false)
  const id = useSelector((state) => state.auth.userID);
  const navigate = useNavigate();
  useEffect(() => {
    if (document.querySelector('#messageBody')) {
    
      var messageBody = document.querySelector('#messageBody');
     
      messageBody.scrollTop = messageBody.scrollHeight;
    }
  }, [])
  


  /*useEffect(() => {
    let values ={
      "id" :id
    }
    fetch("http://localhost:8080/api/friend/getAllFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllFriends(data)
      });
  }, [])*/


  /*useEffect(() => {

    if(allFriends.length != 0 /*&& allFriends[0].id != null*//*){*/

  /*   allFriends.map(e =>{
       
       let values ={
         "userId" :e.userId
       }
       fetch("http://localhost:8080/api/friend/getFriend", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log(data);
           setFriends(oldArray => [...oldArray, data])
         });
 

     })
    
   }
  
 }, [allFriends])*/

  return (
    <div className="container-fluid m-0 p-0 chat-wrapper">
      <div className='row m-0 p-0'>

        <div className='col-3 chat-left-section m-0 p-0 d-flex flex-column justify-content-start'>

          <div className='friend-list-wrapper'>
            <ChatList></ChatList>
          </div>

        </div>

        <div className='col-9 chat-right-section m-0 p-0' >
          <div id="messageBody" className='chat-right-top-section p-3'>

            <div><MessageLeft></MessageLeft></div>
            <div ><MessageRight></MessageRight></div>
            <div><MessageLeft></MessageLeft></div>
            <div ><MessageRight></MessageRight></div>
            <div><MessageLeft></MessageLeft></div>
            <div ><MessageRight></MessageRight></div>

          </div>
          <div ><SendMessageSection></SendMessageSection></div>

        </div>

        <Popup></Popup>
        
      </div>
    </div>

  )
}
