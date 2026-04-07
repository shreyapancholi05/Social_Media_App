"use client";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import SidebarUserInfo from "./SidebarUserInfo";
import Image from "next/image";
import { useState } from "react";

interface SidebarProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Bars3Icon
        className="h-16 w-14 cursor-pointer ml-2 mt-3 py-4 sm:hidden"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <nav
          className={`h-screen fixed left-0  top-0 z-50 p-2 xl:ml-20  transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static`}
        >
          <div className=" h-full flex flex-col">
            <div className="py-1">
              <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width={95}
                height={95}
                loading="eager"
                
              ></Image>
            </div>

            <ul className="flex flex-col items-start">
              <SidebarLink Icon={HomeIcon} text="Home" />
              <SidebarLink Icon={HashtagIcon} text="Explore" />
              <SidebarLink Icon={BellIcon} text="Notifications" />
              <SidebarLink Icon={InboxIcon} text="Messages" />
              <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
              <SidebarLink Icon={UserIcon} text="Profile" />
              <SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />
              <button className="hidden xl:block bg-amber-400 w-40 h-12 rounded-full text-white font-medium cursor-pointer shadow-md mt-2">
                Bumble
              </button>
            </ul>
            <div className="mt-auto flex justify-center xl:justify-start px-2">
            <SidebarUserInfo/>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

function SidebarLink({ text, Icon }: SidebarProps) {
  return (
    <li className="flex items-center text-xl mb-6 space-x-3 px-7.5">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}

export default Sidebar;
