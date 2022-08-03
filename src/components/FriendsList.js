import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { PopupActions } from '../store/slices/Popup';
import { ThreePointsDropdown } from './ThreePointsDropdown';
import { Try } from './Try';

export const FriendsList = (props) => {
    const [show, setShow] = useState(false)

    
    return (
        <div className='fl m-0 p-0' >
            <div className='threeP-wrapper'>
                <div className='position-absolute d-flex justify-content-end align-items-center w-100 '>

                    <ThreePointsDropdown></ThreePointsDropdown>

                </div>
            </div>


            <div className='row d-flex justify-content-center mx-2 pt-3 pb-3'>
                <div className='col-4 col-sm-3 d-flex justify-content-center  align-items-center p-0 m-0'>
                <div className='friend-list-circle d-flex align-items-center p-0 m-0 justify-content-center text-light fw-bold'>{props.name[0]}</div></div>
                <div className='col-8 col-sm-9 friend-list-content d-flex align-items-center justify-content-center p-0 m-0 fs-sm-6'>{props.name} {props.surname}</div>
            </div>


        </div>
    )
}
