import './App.css';
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
import { useDispatch, useSelector } from 'react-redux';
import { DropdownActions } from './store/slices/LeftSideDropdown';
import { focusInputActions } from './store/slices/HomeSectionInputFocus';
import { WebSocketMessageActions } from './store/slices/WebSocketMessage';
import { ForgotPassword } from './pages/ForgotPassword';

function App() {

  const Auth = useSelector((state) => state.auth.authentication);
  const focusInput = useSelector((state) => state.focusInput.focusInput);
  const stompClient = useSelector((state) => state.stompClient.stompClient);
  const dispatch = useDispatch();


  const dropdownStatusHandler = () => {

    dispatch(DropdownActions.changeState(false))

  }

  const HomeSectionInputFocusing = () => {
    if (focusInput != 0) {
      dispatch(focusInputActions.changeState(-1))
    }

  }
  const onError = (err) => {
    console.log(err);

  }
  
  //stompClient.debug = null;
  stompClient.connect({}, () => {
    
    stompClient.subscribe('/chatroom/public', function (frame) {
      
      dispatch(WebSocketMessageActions.changeState(JSON.parse(frame.body)));

    });
  }, onError);

  return (
    <BrowserRouter>
      {<div onClick={dropdownStatusHandler}>
        <div onClick={HomeSectionInputFocusing}>

          {Auth && <Navbar></Navbar>}
          {/*<Try></Try>*/}

          {<Routes >
            {<Route exact path="/" element={<Login />}></Route>}
            {<Route path="/forgotPassword" element={<ForgotPassword />}></Route>}
            {<Route path="/register" element={<Register />}></Route>}
            {<Route path="/home" element={<div ><Home /></div>}></Route>}
            {<Route path="/chat" element={<div ><Chat /></div>}></Route>}
          </Routes>}
        </div>
      </div>}
    </BrowserRouter>
  );
}

export default App;
