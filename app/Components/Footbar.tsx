"use client";

import { useAuthStore } from "../store/AuthStore";
import { useGlobalStore } from "../store/GlobalStore";

function SignUpPrompt() {
  const openModal = useGlobalStore((state) => state.openModal);
  const username = useAuthStore((state) => state.user?.username);
  
  
  
  
  return (
    <div className="py-12">

    {!username && (

      <div className="fixed w-full h-20 bg-amber-300 bottom-0 flex justify-center items-center md:space-x-10 lg:justify-between  lg:px-20 xl:px-40 2xl:px-80 z-40">
        <div className="hidden md:flex flex-col text-white ">
          <span className="text-xl font-bold">Do not miss out on the buzz</span>
          <span>People on Busy Bee are always the first to know</span>
        </div>
        <div className="flex space-x-3 w-full md:w-fit p-3">
          <button
            className="w-full md:w-24 h-12 md:h-10 
            text-md md:text-sm 
            border-2 border-white 
            rounded-full 
            font-semibold 
            text-white 
            hover:bg-white hover:text-black 
            transition-all duration-200 
            cursor-pointer"
            onClick={() => openModal("login")}
          >
            Login
          </button>

          <button
            className="w-full md:w-24 h-12 md:h-10 
            text-md md:text-sm 
            font-semibold 
            rounded-full 
            text-black 
            bg-white 
            hover:bg-gray-200 
            transition-all duration-200 
            cursor-pointer"
            onClick={() => openModal("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    )}
    </div>
  );
}

export default SignUpPrompt;
