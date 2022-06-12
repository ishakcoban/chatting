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
  Routes
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { useEffect, useState } from 'react';

function App() {
    
  const [show, setShow] = useState(false)
  const clickHandler = () => {
    setShow(!show)
  }


  return (
    <BrowserRouter>
      <div >

        {<Navbar click={show}></Navbar>}

        {<Routes >
          <Route exact path="/" element={<div><Login /></div>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<div onClick={clickHandler}><Home /></div>}></Route>
          <Route path="/chat" element={<div onClick={clickHandler}><Chat /></div>}></Route>

        </Routes>}
      </div>
    </BrowserRouter>
  );
}

export default App;
