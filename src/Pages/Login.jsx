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
    <div className="login w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-[40%] bg-gray-900 bg-opacity-70 rounded-2xl flex flex-col items-center justify-center gap-5 p-6">
        <p className="font-semibold text-xl sm:text-2xl text-white text-center">
          LOGIN USING GOOGLE
        </p>
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black cursor-pointer hover:scale-105 transition-transform"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={30} />
        </div>
      </div>
    </div>
  );
};

export default Login;
