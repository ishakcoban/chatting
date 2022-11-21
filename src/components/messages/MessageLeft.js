import React from 'react'

export const MessageLeft = (props) => {
    return (
        <div className='container-fluid m-0 p-0 mt-2 mb-2'>
            <div className='message-content-wrapper pt-3 pe-3 ps-3 ms-5'>
                <div className='flex-wrap'>{props.content}</div>
                <div className=' d-flex justify-content-end mr-3'>{props.date}</div>
            </div>
        </div>
    )
}
