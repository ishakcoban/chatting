import React, { useState } from 'react'
import $ from "jquery"
import { useDispatch, useSelector } from 'react-redux';
import { DropdownActions } from '../store/slices/LeftSideDropdown';
import { PopupActions } from '../store/slices/Popup';
export const ThreePointsDropdown = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const infoWrapper = () => {
        dispatch(PopupActions.changeState());
        setShow(!show)
    }
    return (
        <div >
            <div className='d-flex flex-column align-items-end justify-content-center' >
                <div className={show ? 'three-points-wrapper d-flex p-1 mt-1 me-1 align-items-center dd-bg' : 'three-points-wrapper d-flex p-1 mt-1 me-1 align-items-center'} onClick={(e) => { setShow(!show); }}>
                    <div className='points '></div>
                    <div className='points'></div>
                    <div className='points '></div>
                </div>
            </div>
            <div className='d-flex flex-column align-items-end'>
                <div className='d-flex flex-column align-items-start'>
                    <div className='d-flex p-1 opacity-0 '>
                        <div className='points '></div>
                        <div className='points'></div>
                        <div className='points '></div>
                    </div>
                    {show && <div className='position-absolute three-points-content-wrapper' >
                        <div className='three-points-content-link' onClick={infoWrapper}>View Profile</div>
                        <div className='three-points-content-link mt-2'>Send Message</div>
                    </div>
                    }
                </div>
            </div>

        </div>
    )
}
