import React, { useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cross from "../images/cross.png"
import { PopupActions } from '../store/slices/Popup'

export const Popup = (props) => {
    const Popup = useSelector((state) => state.popup.popup);
    const dispatch = useDispatch();
    console.log(Popup)
    const popupHandler = () => {
        dispatch(PopupActions.changeState());

    }
    return (
        <div className='p-0 m-0'>
            {Popup && <div className='container-fluid m-0 p-0 position-absolute top-0 vw-100 vh-100 '>
                <div onClick={popupHandler} className='position-absolute top-0 vw-100 vh-100 popup-bg'></div>
                <div className='popup-wrapper p-0 m-0'>

                    <div className='d-flex justify-content-end'><img onClick={popupHandler} className='popup-cross-img mt-3 mx-3' src={cross}></img></div>
                    <div className='top-content text-light d-flex align-items-end'>
                        <div className='w-100'>
                            <div className='top-content-user-name row p-0 m-0'>

                                <div className='col-6'><div className='top-content-circle d-flex justify-content-center align-items-center'>N</div></div>
                                <div className='col-6 d-flex justify-content-end align-items-end'>asdsadassasdsaddad</div>
                            </div>
                            <div className='top-content-line'></div>
                            {/*<div className='bg-danger'><div className='top-content-circle'></div></div>*/}
                        </div>

                    </div>
                </div>
            </div>}
        </div>

    )
}
