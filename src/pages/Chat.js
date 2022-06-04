import React , { useEffect, useState }from 'react'
import { Message } from '../components/Message'
import { MessageWrapper } from '../components/MessageWrapper'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { SendMessageSection } from '../components/SendMessageSection';
export const Chat = () => {
  const [allFriends, setAllFriends] = useState([]);
  const [friendid,setFriendId]= useState(null)
  const [friends,setFriends] = useState([])
  const [show,setShow] = useState(false)
  const id = useSelector((state) => state.auth.userID);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [])


  useEffect(() => {

    if(allFriends.length != 0 /*&& allFriends[0].id != null*/){

      allFriends.map(e =>{
        
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
   
  }, [allFriends])

  return (
    <div className='container-fluid m-0 p-0 login-wrapper'>
      <div className='row section-wrapper m-0 p-0'>
        <div className='left-section col-3 p-0'>{friends.length != 0 && friends.map(e =>{
          return e.id != null && <div onClick={()=>{
            setShow(!show);
            setFriendId(e.id)
          }}  key={e.id} className='messagehv'><Message id={e.id} pp={e.name[0]} name={e.name}></Message></div> 
        })}</div>
        <div className='right-section col-9 p-0 '>
          <div className='right-message-section'>{show && <MessageWrapper FId ={friendid} Uid={id}></MessageWrapper>}</div>
          {show && <SendMessageSection FId ={friendid} Uid={id}></SendMessageSection>}
        </div>
      </div>
    </div>
  )
}
