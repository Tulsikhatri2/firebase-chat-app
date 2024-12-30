import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { RiChatAiFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, limit, doc } from "firebase/firestore";
import Messages from "../Components/Messages";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setMessagesData(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter a valid message");
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
    <div className="w-full h-full flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full sm:w-[45%] h-[10%] flex items-center justify-between p-5">
        <p className="flex items-center">
          <RiChatAiFill size={25} className="text-red-800" />
          <span className="font-bold text-xl ml-2">CHAT-BOX</span>
        </p>
        <button
          className="text-md px-4 py-2 rounded-3xl bg-slate-200 text-red-900 font-bold shadow-md"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
      <div className="w-full sm:w-[50%] md:w-[45%] lg:w-[40%] h-[80%] mt-5 border border-black rounded-3xl p-4 flex flex-col gap-4">
        <div className="w-full h-[80%] overflow-y-auto overflow-x-hidden mb-3 flex flex-col">
          {messagesData?.map((item, index) => (
            <Messages key={index} message={item} handleEditData={handleEditData} index={index} />
          ))}
        </div>
        <div className="w-full h-[10%] flex items-center justify-between px-3">
          <input
            className="w-full sm:w-[30vw] md:w-[25vw] border border-black py-2 px-3 rounded-3xl"
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="text-cyan-700 text-3xl ml-2"
            onClick={() => (isEdit ? handleUpdate() : handleSendMessage())}
          >
            {!isEdit ? <IoSend /> : <FaEdit />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
