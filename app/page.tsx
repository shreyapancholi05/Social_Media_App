"use client";
import Sidebar from "./Components/SidebarComponents/Sidebar";
import PostFeed from "./Components/PostComponents/PostFeed";
import Widgets from "./Components/Widgets";
import DisplayModal from "./modals/DisplayModal";

import SignUpPrompt from "./Components/Footbar";

const page = () => {
  return (
    <>
      <div className="text-[#0f1419] min-h-screen   max-w-7xl flex mx-auto justify-center">
        <Sidebar></Sidebar>
        <PostFeed></PostFeed>
        <Widgets></Widgets>
      </div>

      <SignUpPrompt></SignUpPrompt>
      <DisplayModal></DisplayModal>
    </>
  );
};

export default page;
