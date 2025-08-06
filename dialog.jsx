import React, { useEffect, useRef } from "react";
import { AiFillGoogleCircle, AiOutlineClose } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";

const SignInDialog = ({ isOpen, onClose, formData }) => {
  const dialogRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose(); // Close the dialog
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ✅ THIS is where you fetch user + save both user and trip data
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const user = await res.json();
        console.log("✅ User Info:", user);

        // ✅ Save user and trip info to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tripData", JSON.stringify(formData)); // 👈 THIS is the line you're asking about

        alert(`Welcome, ${user.name}!`);
        onClose();
      } catch (error) {
        console.error("❌ Error fetching user info", error);
        alert("Something went wrong after login.");
      }
    },
    onError: (err) => {
      console.error("❌ Google Login Failed:", err);
      alert("Google login failed. Try again.");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative pointer-events-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
        >
          <AiOutlineClose />
        </button>

        <div className="flex flex-col items-center">
          <img src="logo.svg" alt="Logo" className="w-25 h-25" />
          <h2 className="font-bold text-2xl mb-2 text-gray-800">
            Sign In With Google
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to the App with Google authentication securely
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition cursor-pointer"
          >
            <AiFillGoogleCircle className="text-2xl" />
            Sign in With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
