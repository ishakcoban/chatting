import React, { useEffect, useState } from 'react'
import { FlowButton } from '../components/buttons/FlowButton';
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { FriendsList } from '../components/FriendsList';
import friends from "../images/friends.png";

export const Home = () => {
  const [allUsers, setAllUsers] = useState({});
  const [show, setShow] = useState(true);
  const id = useSelector((state) => state.auth.userID);
  const navigate = useNavigate();

  useEffect(() => {
    let values = {
      "id": id
    }
    fetch("http://localhost:8080/api/user/getAllUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllUsers(data)
      });
  }, [])



  const showHandler = () => {
    setShow(!show);
  }

  return (
    <div className="container-fluid m-0 p-0 home-wrapper position-relative">
      <div className='row home-section-wrapper m-0 p-0'>

        {show && <div className='col-2 home-left-section m-0 p-0 d-flex flex-column justify-content-start'>
          <div className='mx-3'>
            <div className='me-1'>your friends</div>
            <hr className='left-section-line'></hr>
          </div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
          <div> <FriendsList></FriendsList></div>
        </div>}

        <div className={ show ? 'col-10 home-right-section m-0 p-0 position-relative': 'col-12 home-right-section m-0 p-0 position-relative'}>
        <div className='square position-absolute'>
        <div className='position-absolute'><img onClick={showHandler} className='friends-logo m-1' src={friends}></img></div>
          <div className='quarter-circle-bottom-right'>
          </div>
        </div>
          <div className='position-absolute flowbutton-list-wrapper'>
          
          
          <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            <FlowButton click={"1"} name={"A"}></FlowButton>
            {allUsers.length != null && allUsers.map(e => {
              return <div key={e.id} className='d-flex justify-content-center'><FlowButton click={e.id} name={e.name}></FlowButton></div>
            })}
          
           

          </div>
        </div>


      </div>
      {/*<div onClick={chatHandler} className='position-absolute'><div className='position-fixed circle circle-chat d-flex justify-content-center align-items-center fw-bold text-light mt-2  ms-2'>Chat</div></div>*/}
      {/*<div className='flowbutton-list-wrapper'>
      {allUsers.length != null && allUsers.map(e =>{
        return <div key={e.id}  className='d-flex justify-content-center'><FlowButton click={e.id}  name= {e.name}></FlowButton></div>
      })}
      
    </div>*/}</div>
  )
}
