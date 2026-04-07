import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

function Widgets() {
  return (
    <div className="p-3 hidden lg:flex flex-col space-y-4 w-100 ps-10">
      <div className="flex bg-neutral-200/70 text-neutral-600 items-center space-x-3 rounded-full h-10 pl-5">
        <MagnifyingGlassIcon className="w-5 h-5" />

        <input
          type="text"
          placeholder="Search Busy Bee"
          className="bg-transparent outline-none "
        />
      </div>

      <div className="bg-neutral-200/70 rounded-xl    p-3">
        <h1 className="text-xl font-bold mb-2">What is happening</h1>

        <div className="flex flex-col text-sm py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-[14px]">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-5" />
          </div>

          <span className="font-bold text-md">#Reactjs</span>
          <span className="text-gray-600 text-[13px]">240k Bumbles</span>
        </div>

        <div className="flex flex-col text-sm py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-[14px]">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-5" />
          </div>

          <span className="font-bold text-md">#Reactjs</span>
          <span className="text-gray-600 text-[13px]">240k Bumbles</span>
        </div>

        <div className="flex flex-col text-sm py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-[14px]">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-5" />
          </div>

          <span className="font-bold text-md">#Reactjs</span>
          <span className="text-gray-600 text-[13px]">240k Bumbles</span>
        </div>

        <div className="flex flex-col text-sm py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-[14px]">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-5" />
          </div>

          <span className="font-bold text-md">#Reactjs</span>
          <span className="text-gray-600 text-[13px]">240k Bumbles</span>
        </div>
      </div>

      <div className="bg-neutral-200/70 rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Who to follow</h1>

        <div className="flex justify-between items-center py-3">
          <div
            className="flex space-x-3 items-center
        "
          >
            <Image
              src="/assets/howl-random-guy.jpg"
              alt="Profile picture"
              width={60}
              height={60}
              className="w-14 h-14 rounded-full"
            ></Image>

            <div className="flex flex-col text-md">
              <span className="font-bold">Code Man</span>
              <span>@imancodes</span>
            </div>
          </div>

          <button className="bg-black rounded-full w-20 h-10 text-white">
            Follow
          </button>
        </div>
        <div className="flex justify-between items-center py-3">
          <div
            className="flex space-x-3 items-center
        "
          >
            <Image
              src="/assets/howl-random-guy.jpg"
              alt="Profile picture"
              width={60}
              height={60}
              className="w-14 h-14 rounded-full"
            ></Image>

            <div className="flex flex-col text-md">
              <span className="font-bold">Code Man</span>
              <span>@imancodes</span>
            </div>
          </div>

          <button className="bg-black rounded-full w-20 h-10 text-white">
            Follow
          </button>
        </div>
        <div className="flex justify-between items-center py-3">
          <div
            className="flex space-x-3 items-center
        "
          >
            <Image
              src="/assets/howl-random-guy.jpg"
              alt="Profile picture"
              width={60}
              height={60}
              className="w-14 h-14 rounded-full"
            ></Image>

            <div className="flex flex-col text-md">
              <span className="font-bold">Code Man</span>
              <span>@imancodes</span>
            </div>
          </div>

          <button className="bg-black rounded-full w-20 h-10 text-white">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
