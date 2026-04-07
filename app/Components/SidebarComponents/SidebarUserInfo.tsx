"use client";
import Image from "next/image";
import { useAuthStore } from "@/app/store/AuthStore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/Firebase/firebase";
function SidebarUserInfo() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (!user?.username) return null;
  const handleSignOut = async () => {
    await signOut(auth);
    useAuthStore.getState().clearUser();
  };

  return (
    <div className="relative w-full">
      <div
        className=" flex items-center absolute bottom-0 space-x-2 xl:p-3 xl:pe-6 rounded-full hover:bg-gray-500/10 transition cursor-pointer w-fit xl:w-60"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <Image
          src="/assets/profile.jpg"
          alt="Profile picture"
          width={36}
          height={36}
          className="w-9 h-9"
        ></Image>

        <div className="hidden xl:flex flex-col text-sm max-w-40">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden   font-bold">
            {user.username}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
            {user.email}
          </span>
        </div>
      </div>
      {showMenu && (
        <div className="absolute border border-gray-100 rounded shadow-md bottom-16 left-10 w-40 flex flex-col z-50 bg-gray-100 p-2">
          <button className="block w-full text-left rounded hover:bg-gray-500/10 px-3 py-2 text-lg cursor-pointer border-b border-gray-200">
            Profile
          </button>
          <button className="block w-full text-left rounded hover:bg-gray-500/10 px-3 py-2 text-lg cursor-pointer border-b border-gray-200">
            Settings
          </button>
          <button
            className="block w-full text-left rounded hover:bg-gray-500/10 px-3 py-2 text-lg cursor-pointer"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SidebarUserInfo;
