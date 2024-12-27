import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from './Pages/ChatBox';
import { useEffect } from 'react';

function App() {

  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.accessToken){
      navigate("/chat-box")
    }
    else{
      navigate("/")
    }
  },[user])

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/chat-box" element={<ChatBox/>}/>
    </Routes>
    </>
  );
}

export default App;
