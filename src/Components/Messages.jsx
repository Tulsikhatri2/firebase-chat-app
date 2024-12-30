import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteDoc, doc } from "firebase/firestore";

const Messages = ({ message, handleEditData, index }) => {
  const [user] = useAuthState(auth);
  const [userOptions, setUserOptions] = useState(false);

  const handleDelete = async () => {
    const taskDocRef = doc(db, "messages", message?.id);
    try {
      await deleteDoc(taskDocRef);
      setUserOptions(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleOptions = () => {
    setUserOptions(!userOptions);
  };

  return (
    <div
      className={`w-[37vw] h-[12vh] ${
        message?.uid === user?.uid
          ? "flex items-center justify-end pr-2"
          : "flex items-center justify-start"
      }`}
      key={index}
      onClick={() => {
        if (userOptions) setUserOptions(false);
      }}
    >
      <div className={`card  relative`}>
        <div className="img">
          <img src={message?.avatar} style={{ borderRadius: "50%" }} />
        </div>
        <div className="textBox">
          <div className="textContent">
            <p className="font-semibold text-xs flex justify-between w-[100%]">
              {message?.name}
              {message?.uid === user?.uid ? (
                <span onClick={() => setUserOptions(!userOptions)}>
                  <SlOptionsVertical />
                </span>
              ) : null}
              {userOptions ? (
                <div
                  className="w-[10vw] h-[10vh] rounded-lg bg-gray-600 absolute top-10 right-2 flex 
            flex-col items-center justify-between shadow-inner shadow-black p-2"
                >
                  <p
                    className="w-[100%] text-center text-sm font-semibold "
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </p>
                  <hr className="border border-slate-500 w-[110%]" />
                  <p
                    className="text-sm font-semibold w-[100%] text-center"
                    onClick={() => {
                      handleEditData(message);
                      handleOptions();
                    }}
                  >
                    Edit
                  </p>
                </div>
              ) : null}
            </p>
          </div>
          <p className="text-md font-semibold">{message?.text}</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
