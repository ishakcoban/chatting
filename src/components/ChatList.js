import React from 'react'
import { useSelector } from 'react-redux'
import formatAMPM from '../actions/FormatDate';
export const ChatList = (props) => {
    const id = useSelector((state) => state.auth.userID);
    return (
        <div className=''>

            <div className='row p-0 m-0 pt-2'>
                <div className='col-4 col-sm-3 col-lg-3 col-xl-2 '>
                    <div className='chat-list-circle d-flex align-items-center justify-content-center text-light'>{props.eachData.participants.map(e => { return e.id != id ? e.name[0] : null })}</div>
                </div>
                <div className='col-8 col-sm-9 col-lg-9 col-xl-10 fs-5 d-flex align-items-center p-0'>{props.eachData.participants.map(e => { return e.id != id ? e.name + ' ' + e.surname : null })}</div>
            </div>

            <div className='row p-0 m-0 pt-2'>
                <div className='chat-list-message'><div>{props.eachData.messages[props.eachData.messages.length - 1].content}</div></div>
            </div>
            <div className='row p-0 m-0 pt-2'>
                <div className='chat-list-message-time d-flex align-items-center justify-content-end fw-bold'>{formatAMPM(new Date(props.eachData.lastMessageDate))}</div>
            </div>
            <div className='chat-list-line'></div>
        </div>
    )
}
