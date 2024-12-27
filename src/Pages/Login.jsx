import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider); 
    } catch (error) {
      console.error("Error during Google Sign-in:", error.message);
    }
  };

   return (
    <div className="w-[100vw] h-[100vh] login flex items-center justify-center">
      <div className="w-[30%] h-[40%] bg-gray-900 bg-opacity-45 rounded-2xl flex flex-col items-center justify-center gap-5">
        <p className="font-semibold text-2xl underline text-white text-center">LOGIN USING GOOGLE</p>
        <div
          className="w-[3vw] h-[6vh] bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-black cursor-pointer"
        >
          <FcGoogle size={30} onClick={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
