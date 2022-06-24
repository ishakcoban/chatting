import React, { useEffect, useState } from 'react'
import chat from "../images/chat.png";
import home from "../images/home.png";
import chat1 from "../images/chat1.png";
import home1 from "../images/home1.png";
import notification from "../images/notification.png";
import notification1 from "../images/notification1.png";
import profile from "../images/profile.png";
import profile1 from "../images/profile1.png";
import tick from "../images/tick.png";
import cross from "../images/cross2.png";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { PopupActions } from '../store/slices/Popup';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { NotificationActions } from '../store/slices/Notification';
export const Navbar = (props) => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const navigate = useNavigate();
    const userid = useSelector((state) => state.auth.userID);
    const notificationUpdate = useSelector((state) => state.notification.notification);
    const dispatch = useDispatch();

    const [notifications, setNotifications] = useState([])

    useEffect(() => {

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

            });
    }, [notificationUpdate])
    const infoHandler = () => {
        dispatch(PopupActions.changeState());
    }
    const { pathname } = useLocation();

    const profileHandler = () => {
        setShow(!show)
        setShow1(false);
    }
    const notificationHandler = () => {
        setShow1(!show1);
        setShow(false);
    }


    useEffect(() => {

        setShow(false)
        setShow1(false)

    }, [props.click])


    const generalHandler = () => {
        if (show || show1) {
            setShow(false)
            setShow1(false)
        }
    }
    const clickOnChild = (event) => {
        event.stopPropagation();

    }

    const requestHandler = (e,friendId) => {

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
                    dispatch(NotificationActions.changeState())

                });
            
        }

    }

    return (
        <div className='container-fluid m-0 p-0 navbar-wrapper' onClick={generalHandler}>
            <div className='row pt-3 pb-3 p-0 m-0'>
                <div onClick={() => { navigate("/home") }} className='col-4 col-sm 1 col-md-3 col-lg-2 logo-name d-flex justify-content-center align-items-center logo'>Chattin'</div>
                <div className='col-8 col-sm-8 col-md-9 col-lg-10 text-center d-flex flex-column justify-content-center'>

                    <div className='row me-4'>
                        <div className='col-0 col-md-4 col-lg-4 col-xl-8'></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 '><NavLink to="/home"><img className='navbar-image' src={pathname == "/home" ? home1 : home}></img></NavLink></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 each-logo'><NavLink to="/chat"><img className='navbar-image' src={pathname == "/chat" ? chat1 : chat}></img></NavLink></div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 position-relative d-flex flex-column align-items-center '>

                            <div className='position-relative d-flex justify-content-center notify-wrapper' >
                                <div className='position-absolute' onClick={notificationHandler}>
                                    <img id="dr" className='navbar-image' src={show1 ? notification1 : notification}></img>
                                    {notifications.length == 0 ? null : <div className='position-absolute notification-circle d-flex justify-content-center align-items-center'>{notifications.length}</div>}

                                </div>
                            </div>
                            {show1 &&
                                <div className='position-absolute dropdown-menuu ntf text-start' onClick={clickOnChild}>


                                    <div className='dropdown-link '>

                                        {notifications.length == 0 ? null :
                                            notifications.map(e => {

                                                return e.accepted == undefined ? <div key={e.sender}><span style={{ color: '#4946d1', fontWeight: 'bold' }}>{e.sender}</span> accepted your friend request.</div> :

                                                    <div key={e.sender}>

                                                        <div><span style={{ color: '#4946d1', fontWeight: 'bold' }}>{e.sender}</span> requested to you for being friend with you.</div>
                                                        <div className='d-flex mt-2'>
                                                            <button className='accept-ignore-button accept-button-special px-3 fw-normal' onClick={(m)=>requestHandler(m.target.innerHTML,e.sender)}>Accept</button>
                                                            <button className='accept-ignore-button ignore-button-special ms-2 px-3 fw-normal' onClick={(m)=>requestHandler(m.target.innerHTML,e.sender)}>Ignore</button>
                                                        </div>
                                                        <div className='text-end'>{e.date}</div>
                                                        <div className='notification-line'></div>
                                                    </div>
                                            })}


                                    </div>


                                </div>}
                        </div>
                        <div className='col-3 col-md-2 col-lg-2 col-xl-1 position-relative d-flex flex-column align-items-center each-logo'>

                            <img className='position-relative navbar-image' src={show ? profile1 : profile} onClick={profileHandler}></img>
                            {show &&
                                <div className='position-absolute dropdown-menuu'>
                                    <div className='dropdown-link' onClick={infoHandler}>Profile</div>
                                    <div className='dropdown-link mt-2'>Theme:Light</div>
                                    <div className='dropdown-link mt-2'>Log out</div>
                                </div>
                            }
                        </div>

                    </div>
                </div></div></div>
    )
}
