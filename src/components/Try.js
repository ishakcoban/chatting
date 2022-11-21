import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import "./index.css"
var stompClient = null;
const Try = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    //const [publicChats, setPublicChats] = useState([]); 
    const id = useSelector((state) => state.auth.userID);
    const [tab, setTab] = useState("CHATROOM");
    const [user, setUser] = useState(null);
    const [socketResponse, setSocketResponse] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    //useEffect(() => {
    // let Sock = new SockJS('http://localhost:8080/ws');

    /*}, []);*/

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {

        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();

    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            /*case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;*/
        }
    }

    const onPrivateMessage = (payload) => {
        //console.log(payload + "<-----");
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        connect();
    }
    //console.log(stompClient + '<------')
    // console.log({...privateChats})
    console.log(socketResponse)
    return (
        <div className="container">
            
            <div><button onClick={() => {
                if (stompClient) {
                    var chatMessage = {
                        senderId: id,
                        receiverId: "JOIN",
                    };

                    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
                }

            }
            }>Click</button></div>
            <div><button onClick={() => {
                let Sock = new SockJS('http://localhost:8080/ws');
                stompClient = over(Sock);
                stompClient.connect({}, () => {
                    stompClient.subscribe('/chatroom/public', function (frame) {

                        var messages = JSON.parse(frame.body)
                        setSocketResponse(messages.senderId)
                    });
                   

                }, onError);
            }}>start</button></div>

            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>

                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab !== "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    )
}

export default Try;