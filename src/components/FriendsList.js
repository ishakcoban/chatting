import React from 'react'
import { useDispatch } from 'react-redux';
import { PopupActions } from '../store/slices/Popup';

export const FriendsList = (props) => {
    const dispatch = useDispatch();
    const infoWrapper = () => {
        dispatch(PopupActions.changeState());
    }
    return (
        <div className='container-fluid mt-1'>
            <div className='row d-flex justify-content-center mx-2 pt-2 pb-2 friend-list-each-person' onClick={infoWrapper}>
                <div className='col-4 d-flex justify-content-end'><div className='friend-list-circle d-flex align-items-center p-0 m-0 justify-content-center text-light fw-bold'>{props.name[0]}</div></div>
                <div className='col-8 friend-list-content d-flex align-items-center justify-content-center p-0 m-0'>{props.name} {props.surname}</div>
            </div>
        </div>
    )
}
