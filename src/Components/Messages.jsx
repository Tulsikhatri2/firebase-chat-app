import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteDoc, doc } from "firebase/firestore";

const Messages = (message) => {
    const [user] = useAuthState(auth);
    const [userOptions,setUserOptions] = useState(false)

    const handleDelete = async () => {
        const taskDocRef = doc(db, "messages", message?.message?.id);
        try {
          await deleteDoc(taskDocRef);
          setUserOptions(false)
        } catch (err) {
          alert(err);
        }
      };

  return (
    <div className={`w-[37vw] h-[12vh] ${message?.message?.uid === user?.uid ? "flex items-center justify-end pr-2" : "flex items-center justify-start"}`}>
    <div className={`card  relative`}>
      <div className="img">
        <img src={message?.message?.avatar} style={{borderRadius:"50%"}}/>
      </div>
      <div className="textBox">
        <div className="textContent">
          <p className="h1 flex justify-between w-[100%]">{message?.message?.name}
            {message?.message?.uid === user?.uid ? <span onClick={()=>setUserOptions(!userOptions)}><SlOptionsVertical /></span> : null}
            {userOptions ? 
            <div className="w-[10vw] h-[5vh] rounded-lg bg-slate-400 absolute bottom-16 right-2 flex 
            items-center justify-center shadow-inner shadow-black ">
                <p className="text-sm font-semibold"
                onClick={()=>handleDelete()}>Delete</p>
            </div>: 
            null}
          </p>
        </div>
        <p className="p">{message?.message?.text}</p>
        <div></div>
      </div>
    </div>
    
    </div>
  );
};

export default Messages;
