import React, { useEffect, useReducer, useState } from 'react'
import { FlowButton } from '../components/buttons/FlowButton';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FriendsList } from '../components/FriendsList';
import friends from "../images/friends.png";
import magnifyingGlass from "../images/magnifyingGlass.png";
import { Popup } from '../components/Popup';
import { NotificationActions } from '../store/slices/Notification';
import { Try } from '../components/Try';
import { ThreePointsDropdown } from '../components/ThreePointsDropdown';
import { focusInputActions } from '../store/slices/HomeSectionInputFocus';

export const Home = () => {
  const [allUsers, setAllUsers] = useState({});
  const [allFriends, setAllFriends] = useState([]);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(true);
  const [showFocus, setShowFocus] = useState('false')
  const id = useSelector((state) => state.auth.userID);
  const notificationUpdate = useSelector((state) => state.notification.notification);
  const focusInput = useSelector((state) => state.focusInput.focusInput);
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
  if (document.getElementById("d1")) {
    console.log(document.getElementById("d1").style.zIndex)
    console.log("d1")
  }
  if (document.getElementById("d2")) {
    console.log(document.getElementById("d2").style.zIndex)
    console.log("d2")
  }
  const focusWrapper = (e) => {
    e.stopPropagation();
    //setShowFocus(true)
    dispatch(focusInputActions.changeState(1))
  }
  /*const generalWrapper = () => {
    setShowFocus(false)
  }*/
console.log()
  return (
    <div className="container-fluid m-0 p-0" /*onClick={generalWrapper}*/>
      <div className='row home-section-wrapper m-0 p-0' >

        {show && <div className='col-12 col-sm-3 col-md-4 col-lg-2 col-xl-2 home-left-section m-0 p-0 d-flex flex-column justify-content-start '>


          <div className='mx-3'>
            <div className='me-1'>your friends</div>
            <hr className='left-section-line'></hr>
          </div>




          <div className='friend-list-wrapper' style={{ "zIndex": "10" }}>

            {allFriends.length != null && allFriends.map(e => {
              return <div className='friendlistAnim position-relative' key={e.id} >

                <FriendsList name={e.name} surname={e.surname}></FriendsList>

              </div>
            })}



          </div>

        </div>}

        <div className={show ? 'col-0 col-sm-9 col-md-8 col-lg-10 col-xl-10 home-right-section m-0 p-0' : 'col-12 home-right-section m-0 p-0 '}>
          <div style={{ "height": "17vh" }}>
            <div className='row p-0 m-0 position-relative' >
              <div className='col-1 p-0 m-0 ' >
                <div className='square position-absolute '>

                  <div className='position-absolute' style={{ "zIndex": "2", "borderRadius": "15px" }}><img onClick={showHandler} className='friends-logo m-1' src={friends} ></img></div>
                  <div className='quarter-circle-bottom-right position-relative' >
                  </div>
                </div>

              </div>

            </div>
            <div className='row p-0 m-0 position-relative' style={{ "zIndex": "1" }}>

              <div className='col-8 p-0 m-0 mt-5 home-right-section-descp'><span className='ms-5'>People who are not at the network boundary</span></div>
              <div className='col-4 p-0 m-0 mt-5 d-flex align-items-center justify-content-end d-flex'>
                <div className='me-5 position-relative d-flex align-items-center w-100'>
                  <img className='top-0 ms-3' style={{ "width": "20px" }} src={magnifyingGlass}></img>

                  <div className='position-absolute w-100'><input onClick={focusWrapper} className='justify-self-end home-right-section-input p-1 w-100  pt-2 pb-2' placeholder='Search a person...' /></div>

                </div>


              </div>

            </div>
            <div className=' p-0 m-0 position-relative mx-5' style={{ "zIndex": "2" }}><hr className='bg-light opacity-100'></hr></div>

          </div>
          <div className='position-relative flowbutton-list-wrapper' style={{ "zIndex": "2", "height": "71vh" }}>

            {allUsers.length != null && allUsers.map(e => {
              return <div key={e.id}><FlowButton id={e.id} name={e.name} surname={e.surname} callBack={callBack}></FlowButton></div>
            })}


          </div>
          <div className={focusInput == 1 ? 'position-absolute home-right-section-search-result d-flex justify-content-end align-items-start focusOpenAnim' : focusInput == -1 && 'position-absolute home-right-section-search-result d-flex justify-content-end align-items-start focusCloseAnim'} >

            <div onClick={focusWrapper} className='col-4 bg-light home-right-section-search-result-cart me-5 p-0 m-0'>
              {/*<div className='m-2 text-center text-danger fw-bold'>Not Found Any User</div>*/}
              <div className='col-12 p-0 m-0'>
                <div className='row d-flex justify-content-center pt-3 pb-3 fl'>
                  <div className='col-4 col-sm-3 d-flex justify-content-center  align-items-center p-0 m-0'>
                    <div className='friend-list-circle d-flex align-items-center p-0 m-0 justify-content-center text-light fw-bold'>N</div></div>
                  <div className='col-8 col-sm-9 friend-list-content d-flex align-items-center justify-content-center p-0 m-0 fs-sm-6'>name surname</div>
                </div>
              </div>
            </div>

          </div>

        </div>


        <Popup></Popup>

      </div>
    </div>
  )
}
