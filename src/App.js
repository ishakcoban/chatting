import './App.css';
import { FlowButton } from './components/buttons/FlowButton';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  Try  from './components/Try';
import { ThreePointsDropdown } from './components/ThreePointsDropdown';
import { DropdownActions } from './store/slices/LeftSideDropdown';
import { Test } from './components/Test';
import { FriendsList } from './components/FriendsList';
import { focusInputActions } from './store/slices/HomeSectionInputFocus';

function App() {
  const Auth = useSelector((state) => state.auth.authentication);
  const focusInput = useSelector((state) => state.focusInput.focusInput);
  const ddStatus = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)

  const dropdownStatusHandler = () => {
    //setShow(!show)
    
      dispatch(DropdownActions.changeState(false))
    
  }

  const HomeSectionInputFocusing = () => {
    if (focusInput != 0) {
      dispatch(focusInputActions.changeState(-1))
    }

  }


  return (
    <BrowserRouter>
      {<div onClick={dropdownStatusHandler}>
        <div onClick={HomeSectionInputFocusing}>

          {/*Auth && <Navbar></Navbar>*/}
          <Try></Try>

          {/*<Routes >
            {<Route exact path="/" element={<Login />}></Route>}
            {<Route path="/register" element={<Register />}></Route>}
            {<Route path="/home" element={<div ><Home /></div>}></Route>}
            {<Route path="/chat" element={<div ><Chat /></div>}></Route>}
  </Routes>*/}
        </div>
</div>}
    </BrowserRouter>
  );
}

export default App;
