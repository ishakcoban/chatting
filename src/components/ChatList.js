import React from 'react'

export const ChatList = () => {
    return (
        <div className='chat-list-wrapper'>
            <div className='row p-0 m-0 pt-2'>
                <div className='col-2'><div className='chat-list-circle d-flex align-items-center justify-content-center text-light'>N</div></div>
                <div className='col-10 d-flex align-items-center fs-5 p-0'>Name Surname</div>
            </div>

            <div className='row p-0 m-0 pt-2'>
                <div className='chat-list-message'><div>sadsad as d asd sa d asd sa d sa d asd s ad as d sa ds as d as  dsaasdsa  das </div></div>
            </div>
            <div className='row p-0 m-0 pt-2'>
                <div className='chat-list-message-time d-flex align-items-center justify-content-end fw-bold'>12:20 PM</div>
            </div>
            <div className='chat-list-line'></div>
           
            
        </div>
    )
}
