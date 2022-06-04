import React, { useEffect, useState } from 'react'

export const MessageWrapper = (props) => {
    const [message, setMessage] = useState([])

    useEffect(() => {

        let values = {
            "message": props.Uid
        }
        fetch("http://localhost:8080/api/message/get/" + props.Uid + "/" + props.FId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage(data)
            });


    }, [message])


    return (
        <div className='row m-0 p-0 mb-2'>
            {typeof message != 'number' && message.map(e => {
                return <div key={e.id} className='row mt-2'>
                    <div className='col-1'>
                        <div className='circle d-flex justify-content-center align-items-center text-light fw-bold'>.</div>
                    </div>
                    <div className='col-5 message-content'><div>{e.content}</div></div>
                </div>
            })
            }

        </div>
    )
}
