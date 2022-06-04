import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

export const FlowButton = (props) => {
  const userid = useSelector((state) => state.auth.userID);



  return (
    <div id="flw" className='flowButton-wrapper d-flex flex-column align-items-center '>
    <div className='flow-button-circle mt-4 d-flex justify-content-center align-items-center fw-bolder fs-3'>{props.name[0]}</div>
    <div className='mt-3 text-dark fw-normal'>{props.name}</div>
    <button className='flowButton mt-5 mb-4 w-50' onClick={ ()=>{
      let values ={
        "friendId" : props.click
      }
      console.log(props.click)

      fetch("http://localhost:8080/api/user/friend/add/" + userid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)});
    }
      
    }>Add</button>
    </div>
  )
}
