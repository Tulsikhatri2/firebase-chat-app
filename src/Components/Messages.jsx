import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Messages = (message) => {
    const [user] = useAuthState(auth);
  return (
    <div className={`w-[37vw] h-[12vh] ${message?.message?.uid === user?.uid ? "flex items-center justify-end" : "flex items-center justify-start"}`}>
    <div className={`card`}>
      <div className="img">
        <img src={message?.message?.avatar} style={{borderRadius:"50%"}}/>
      </div>
      <div className="textBox">
        <div className="textContent">
          <p className="h1">{message?.message?.name}</p>
        </div>
        <p className="p">{message?.message?.text}</p>
        <div></div>
      </div>
    </div>
    </div>
  );
};

export default Messages;
