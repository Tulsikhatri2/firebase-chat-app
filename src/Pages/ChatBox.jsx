import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { RiChatAiFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Messages from "../Components/Messages";
import { FaEdit } from "react-icons/fa";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessagesData(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
  };

  const handleEditData = (item) => {
    setIsEdit(true);
    setEditingInfo(item);
  };

  useEffect(() => {
    if (isEdit) {
      setMessage(editingInfo?.text);
    }
  }, [isEdit]);

  const handleUpdate = async () => {
    const taskDocRef = doc(db, "messages", editingInfo?.id);
    try {
      await updateDoc(taskDocRef, {
        text: message,
        lastUpdatedAt: serverTimestamp(),
      });
      setIsEdit(false);
      setEditingInfo(null);
      setMessage("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center ">
      <div className="w-[45%] h-[10%] flex items-center justify-between p-5">
        <p className="flex">
          <span className="px-1 text-red-800">
            <RiChatAiFill size={25} />
          </span>
          <span className="font-bold">CHAT-BOX</span>
        </p>
        <button
          className="text-md px-3 py-2 rounded-3xl shadow-md
             shadow-black bg-slate-200 text-red-900 font-bold"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
      <div className="w-[40%] h-[80%] mt-5 border border-black rounded-3xl p-3 flex flex-col gap-4 ">
        <div className="w-[100%] h-[80%] overflow-y-auto overflow-x-hidden">
          {messagesData?.map((item, index) => {
            return (
              <Messages
                message={item}
                handleEditData={handleEditData}
                index={index}
              />
            );
          })}
        </div>
        <div className="w-[100%] h-[10%] flex items-center justify-between px-3">
          <input
            className="w-[33vw] border border-black py-2 px-3 rounded-3xl cursor-pointer"
            placeholder="Your Meassage..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
          <button
            className="text-cyan-700 text-3xl"
            onClick={() => {
              if (!isEdit) handleSendMessage();
              else handleUpdate();
            }}
          >
            {!isEdit ? <IoSend /> : <FaEdit />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
