import React, { useState } from 'react'

export const Message = (props) => {

  console.log(props.id)

  const clickHandler = () => {


    let values = {
      "userId": props.id
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
        console.log(data)
        //setFriends(oldArray => [...oldArray, data])
      });
  }


  return (
    <div onClick={clickHandler} className='p-0 m-0 message-wrapper d-flex justify-content-around align-items-center pt-3 pb-3 messagehv'>
      <div className='circle fw-bold text-light d-flex justify-content-center align-items-center'>{props.pp}</div>
      <div>{props.name}</div>
    </div>
  )
}
