import React, { useEffect, useReducer, useState } from 'react'
import { FlowButton } from '../components/buttons/FlowButton';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FriendsList } from '../components/FriendsList';
import friends from "../images/friends.png";
import { Popup } from '../components/Popup';
import { NotificationActions } from '../store/slices/Notification';

export const Home = () => {
  const [allUsers, setAllUsers] = useState({});
  const [allFriends, setAllFriends] = useState([]);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(true);
  const [popup, setPopup] = useState(false)
  const id = useSelector((state) => state.auth.userID);
  const notificationUpdate = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callBack = () => {
    dispatch(NotificationActions.changeState())
  }
  useEffect(() => {
    let values = {
      "id": id
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
        setAllFriends(data)
      });
  }, [notificationUpdate])

  useEffect(() => {
    let values = {
      "id": id
    }
    fetch("http://localhost:8080/api/friend/getAllUsers", {
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
  }, [notificationUpdate])

  /**/

  const showHandler = () => {
    setShow(!show);
  }

  return (
    <div className="container-fluid m-0 p-0 home-wrapper">
      <div className='row home-section-wrapper m-0 p-0'>

        {show && <div className='col-12 col-sm-3 col-md-4 col-lg-2 col-xl-2 home-left-section m-0 p-0 d-flex flex-column justify-content-start'>
          <div className='mx-3'>
            <div className='me-1'>your friends</div>
            <hr className='left-section-line'></hr>
          </div>
          <div className='friend-list-wrapper'>
            {allFriends.length != null && allFriends.map(e => {
              return <div className='friendlistAnim' key={e.id}><FriendsList name={e.name} surname={e.surname}></FriendsList></div>
            })}

          </div>

        </div>}

        <div className={show ? 'col-0 col-sm-9 col-md-8 col-lg-10 col-xl-10 home-right-section m-0 p-0 position-relative' : 'col-12 home-right-section m-0 p-0 position-relative'}>
          <div className='square position-absolute'>

            <div className='position-absolute'><img onClick={showHandler} className='friends-logo m-1' src={friends}></img></div>
            <div className='quarter-circle-bottom-right'>
            </div>
          </div>
          <div className='position-absolute ls-wrapper'>

            <div className='flowbutton-list-wrapper'>

              {allUsers.length != null && allUsers.map(e => {
                return <div key={e.id}><FlowButton id={e.id} name={e.name} surname={e.surname} callBack={callBack}></FlowButton></div>
              })}


            </div>
          </div>

        </div>
        <Popup></Popup>

      </div>
    </div>
  )
}
