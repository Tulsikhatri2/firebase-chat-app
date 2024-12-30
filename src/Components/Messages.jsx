import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteDoc, doc } from "firebase/firestore";
import { Box, Button, Menu, MenuItem } from "@mui/material";

const Messages = ({ message, handleEditData, index }) => {
  const [user] = useAuthState(auth);
  const [userOptions, setUserOptions] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      className={`w-full sm:w-[40vw] md:w-[35vw] lg:w-[37vw] h-auto ${
        message?.uid === user?.uid ? "flex items-center justify-end pr-2" : "flex items-center justify-start"
      } my-2`}
      key={index}
      onClick={() => {
        if (userOptions) setUserOptions(false);
      }}
    >
      <div className="card relative flex items-center bg-[#353535] p-2 rounded-xl transition-transform hover:scale-105">
        <div className="img w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] ml-2 rounded-full bg-gradient-to-r from-[#d7cfcf] to-[#9198e5]">
          <img src={message?.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="textBox ml-3 text-white flex flex-col w-full">
          <div className="textContent flex justify-between items-center">
            <p className="text-[1.8vh]">{message?.name}</p>
            {message?.uid === user?.uid && (
               <div>
               <Box
                 id="basic-button"
                 aria-controls={open ? 'basic-menu' : undefined}
                 aria-haspopup="true"
                 aria-expanded={open ? 'true' : undefined}
                 onClick={handleClick}
               >
                <SlOptionsVertical />
               </Box>
               <Menu
                 id="basic-menu"
                 anchorEl={anchorEl}
                 open={open}
                 onClose={handleClose}
                 MenuListProps={{
                   'aria-labelledby': 'basic-button',
                 }}
               >
                 <MenuItem onClick={handleDelete}>Delete</MenuItem>
                 <MenuItem onClick={()=>{handleEditData(message)
                  handleClose()
                 }}>Edit</MenuItem>
               </Menu>
             </div>
            )}
          </div>
          <p className="text-sm font-sans font-semibold mt-1">{message?.text}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Messages;
