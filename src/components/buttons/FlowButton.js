import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from '../../store/slices/Notification';
export const FlowButton = (props) => {

  const userid = useSelector((state) => state.auth.userID);
  const notificationUpdate = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState("");
  const [change, setChange] = useState(false);



  useEffect(() => {
    let values = {
      "id": props.id
    }
    fetch("http://localhost:8080/api/notification/buttonStatus/" + userid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setButtonStatus(data.status)

      });
  }, [change])

  const requestHandler = (e) => {

    if (e.target.innerHTML == 'Add') {

      let values = {
        "id": props.id
      }

      fetch("http://localhost:8080/api/notification/sendRequest/" + userid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setChange(!change)

        });

    } else if (e.target.innerHTML == 'Requested') {
      let values = {
        "id": props.id
      }

      fetch("http://localhost:8080/api/notification/deleteRequest/" + userid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setChange(!change)

        });


    } else if (e.target.innerHTML == 'Accept') {

      let values = {
        "id": props.id
      }

      fetch("http://localhost:8080/api/notification/acceptRequest/" + userid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          props.callBack()
          console.log(data)
          setChange(!change)

        });
      dispatch(NotificationActions.changeState())
    }

  }

  return (
    <div className='flowButton-wrapper p-3 px-4'>
      <div className='flow-button-circle mt-4 d-flex justify-content-center align-items-center fw-bolder fs-3'>{props.name[0]}</div>
      <div className='mt-3 text-dark fw-normal'>{props.name} {props.surname}</div>

      <button className={buttonStatus == 'Add' ? 'flowButton mt-lg-5 mb-lg-4' : 'flowButton mt-lg-5 mb-lg-4 accept-request-btn'} onClick={requestHandler}>
        {buttonStatus}
      </button>

    </div>
  )
}
