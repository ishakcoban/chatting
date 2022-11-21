import React, { useEffect, useState } from 'react'
import chat from "../images/chat.png";
import home from "../images/home.png";
import chat1 from "../images/chat1.png";
import home1 from "../images/home1.png";
import notification from "../images/notification.png";
import notification1 from "../images/notification1.png";
import profile from "../images/profile.png";
import profile1 from "../images/profile1.png";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { PopupActions } from '../store/slices/Popup';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { NotificationActions } from '../store/slices/Notification';
import formatAMPM from '../actions/FormatDate';
import { AuthActions } from '../store/slices/Auth';
import { focusInputActions } from '../store/slices/HomeSectionInputFocus';
import { DropdownActions } from '../store/slices/LeftSideDropdown';
export const Navbar = (props) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(0);
    const navigate = useNavigate();
    const userid = useSelector((state) => state.auth.userID);
    const notificationUpdate = useSelector((state) => state.notification.notification);
    const stompClient = useSelector((state) => state.stompClient.stompClient);
    const ddStatus = useSelector((state) => state.notification.notification);
    const socketResponse = useSelector((state) => state.msg.msg);
    const focusInput = useSelector((state) => state.focusInput.focusInput);
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([])
    const msg = useSelector((state) => state.message.message);
    const Auth = useSelector((state) => state.auth.authentication);

    useEffect(() => {
    


    }, [])
    

    useEffect(() => {

        fetch("http://localhost:8080/api/notification/getAllNotifications/" + userid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(notifications)
                setNotifications(data)

                let counter = 0;
                if (data != 0) {
                    data.map(e => {
                        if (!e.seen) {
                            counter++;
                        }
        
                    })
                    
                    setNotificationCounter(counter);
                  
                } else{
                    setNotificationCounter(0);
                }
            });
      
        
    }, [notificationUpdate])
    useEffect(() => {
        if (socketResponse != null) {
            if (socketResponse.receiverId == userid) {
        fetch("http://localhost:8080/api/notification/getAllNotifications/" + userid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())
            .then((data) => {
             
                setNotifications(data)

                let counter = 0;
                if (data != 0) {
                    data.map(e => {
                        if (!e.seen) {
                            counter++;
                        }
        
                    })
                    console.log('counter: ' + counter);
                    setNotificationCounter(counter);
                  
                } else{
                    setNotificationCounter(0);
                }
            });
            }else if(socketResponse.senderId == userid){
                fetch("http://localhost:8080/api/notification/getAllNotifications/" + userid, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
        
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        setNotifications(data)
        
                        let counter = 0;
                        if (data != 0) {
                            data.map(e => {
                                if (!e.seen) {
                                    counter++;
                                }
                
                            })
                            
                            setNotificationCounter(counter);
                          
                        } else{
                            setNotificationCounter(0);
                        }
                    });
            }
        }
    }, [socketResponse])

    const infoHandler = () => {
        dispatch(PopupActions.changeState());
    }
    const { pathname } = useLocation();

    const profileHandler = (e) => {
        dispatch(DropdownActions.changeState(true));

        setShowProfileDropdown(!showProfileDropdown)
        if (showNotificationDropdown) {
            setShowNotificationDropdown(false)
        }
    }
    const notificationHandler = () => {

        fetch("http://localhost:8080/api/notification/setTrueAllSeenStatus/" + userid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data + "sdasdsadsadsad123123");
                setNotificationCounter(0)
           
            });
        NotificationActions.changeState(!notificationUpdate)
        setShowNotificationDropdown(!showNotificationDropdown)
        if (showProfileDropdown) {
            setShowProfileDropdown(false)
        }
       
    }

    const clickOnChild = (event) => {
        event.stopPropagation();
    }

    const requestHandler = (e, friendId) => {

        if (e == 'Ignore') {
            let values = {
                "id": friendId
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
                    dispatch(NotificationActions.changeState())
                    console.log(data)
                });


        } else if (e == 'Accept') {

            let values = {
                "id": friendId
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
                    console.log(data)
                    var chatMessage = {
                        senderId: userid,
                        receiverId: friendId,
                      };
                      if (stompClient) {
                
                        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
                      }
                    dispatch(NotificationActions.changeState())

                });

        }

    }
    const logOutHandler = () => {
        dispatch(AuthActions.logout())
        navigate('/');
    }

    return (
        <div className='container-fluid m-0 p-0 navbar-wrapper'>
            <div className='row pt-3 pb-3 p-0 m-0'>
                <div onClick={(e) => { navigate("/home"); e.stopPropagation(); if (focusInput == 0) { dispatch(focusInputActions.changeState()) } else if (focusInput == 1) { dispatch(focusInputActions.changeState(-1)) } else { dispatch(focusInputActions.changeState(0)) } }} className='col-4 col-sm 1 col-md-3 col-lg-2 logo-name d-flex justify-content-center align-items-center logo'>Chattin'</div>
                <div className='col-8 col-sm-8 col-md-9 col-lg-10 text-center d-flex flex-column justify-content-center'>

                    <div className='row me-4'>
                        <div className='col-0 col-md-4 col-lg-4 col-xl-8'></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 '><NavLink to="/home" onClick={(e) => { e.stopPropagation(); if (focusInput == 0) { dispatch(focusInputActions.changeState()) } else if (focusInput == 1) { dispatch(focusInputActions.changeState(-1)) } else { dispatch(focusInputActions.changeState(0)) } }}><img className='navbar-image' src={pathname == "/home" ? home1 : home}></img></NavLink></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 each-logo'><NavLink to="/chat"><img className='navbar-image' src={pathname == "/chat" ? chat1 : chat}></img></NavLink></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 position-relative d-flex flex-column align-items-center '>

                            <div className='position-relative d-flex justify-content-center notify-wrapper' >
                                <div className='position-absolute' onClick={notificationHandler}>
                                    <img id="dr" className='navbar-image' src={showNotificationDropdown ? notification1 : notification}></img>
                                    {notificationCounter != 0 && <div className='position-absolute notification-circle d-flex justify-content-center align-items-center'>{notificationCounter}</div>}

                                </div>
                            </div>
                            {showNotificationDropdown &&
                                <div className='position-absolute dropdown-menuu ntf text-start'>
                                    <div className='dropdown-link '>

                                        {
                                            Array.isArray(notifications) ?
                                            notifications.length == 0 ? null :
                                        
                                            notifications.map(e => {

                                                return e.accepted == undefined ?
                                                    <div key={e.sender.id}><div ><span style={{ color: '#4946d1', fontWeight: 'bold' }}>{e.sender.name + ' ' + e.sender.surname}</span> accepted your friend request.</div>
                                                        <div className='text-end date-style'>{formatAMPM(new Date(e.date))}</div>
                                                        <div className='notification-line'></div>
                                                    </div> :
                                                    <div key={e.sender}>

                                                        <div><span style={{ color: '#4946d1', fontWeight: 'bold' }}>{e.sender.name + ' ' + e.sender.surname}</span> requested to you for being friend with you.</div>
                                                        <div className='d-flex mt-2'>
                                                            <button className='accept-ignore-button accept-button-special px-3 fw-normal' onClick={(m) => requestHandler(m.target.innerHTML, e.sender.id)}>Accept</button>
                                                            <button className='accept-ignore-button ignore-button-special ms-2 px-3 fw-normal' onClick={(m) => requestHandler(m.target.innerHTML, e.sender.id)}>Ignore</button>
                                                        </div>
                                                        <div className='text-end date-style'>{formatAMPM(new Date(e.date))}</div>
                                                        <div className='notification-line'></div>
                                                    </div>
                                            }):null}


                                    </div>


                                </div>}
                        </div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 position-relative d-flex flex-column align-items-center each-logo'>

                            <img className='position-relative navbar-image' src={showProfileDropdown ? profile1 : profile} onClick={profileHandler}></img>
                            {showProfileDropdown &&
                                <div className='position-absolute dropdown-menuu dropdown-menuu-profile ' >
                                    <div className='dropdown-link dropdown-link-profile' onClick={infoHandler}>Profile</div>
                                    <div className='dropdown-link mt-2 dropdown-link-profile' onClick={clickOnChild}>Theme:<span className='fw-bold'>Light</span></div>
                                    <div className='dropdown-link mt-2 dropdown-link-profile' onClick={logOutHandler}>Log out</div>
                                </div>
                            }
                        </div>

                    </div>
                </div></div></div>
    )
}
