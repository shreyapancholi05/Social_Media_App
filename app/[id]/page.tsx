import Sidebar from "../Components/SidebarComponents/Sidebar";
import Widgets from "../Components/Widgets";
import DisplayModal from "../modals/DisplayModal";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import SignUpPrompt from "../Components/Footbar";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Comment from "../Components/Comment";
import Link from "next/link";
import Image from "next/image";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
  
};
interface PageProps {
  params: {
    id: string
  }
}

interface Commentprops {
    name: string
            text: string
            username: string
          
}
async function page({ params }: PageProps) {
  const { id } = await params;
  const post = await fetchPost(id);
  console.log("Post:", post);

  return (
    <>
      <div className="text-[#0f1419] min-h-screen   max-w-7xl flex mx-auto justify-center">
        <Sidebar />
        <div className=" grow max-w-2xl border-gray-100 border-x">
          <div className="py-4 mt-3 px-5 text-lg sm:text-2xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-gray-100 border-b flex items-center">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10"></ArrowLeftIcon>
            </Link>
            Bumble
          </div>
          <div className="flex flex-col p-4  space-y-5 border-b border-gray-100">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex space-x-3">
                <Image
                  src="/assets/profile.jpg"
                  alt="Profile picture"
                  width={44}
                  height={44}
                  className="w-11 h-11"
                ></Image>
                <div className="flex flex-col text-[15px]">
                  <span className="font-bold inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-15 min-[400px]:max-w-25 min-[500px]:max-w-35 sm:max-w-40">
                    {post?.name}
                  </span>
                  <span className="text-gray-400 inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-15 min-[400px]:max-w-25 min-[500px]:max-w-35 sm:max-w-40">
                    {post?.username}
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </div>

            <span className="text-[15px]">{post?.text}</span>
          </div>

          <div className="border-b border-gray-100 p-3 text-[15px]">
            <span className="font-bold">{post?.Likes}</span> Likes
          </div>

          <div className="border-b border-gray-100 p-3 text-[15px] flex justify-evenly">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-[#707E89] cursor-not-allowed" />
            <HeartIcon className="w-6 h-6 text-[#707E89] cursor-not-allowed"></HeartIcon>
            <ChartBarIcon className="w-6 h-6 text-[#707E89] cursor-not-allowed"></ChartBarIcon>
            <ArrowUpTrayIcon className="w-6 h-6 text-[#707E89] cursor-not-allowed" />
          </div>

          { 
          post?.comments.map((comment: Commentprops ) => (

            <Comment name={comment.name} username={comment.username} text={comment.text}/>
          ))}
        </div>

        <Widgets></Widgets>
      </div> 

      <SignUpPrompt></SignUpPrompt>
      <DisplayModal></DisplayModal>
    </>
  );
}

export default page;
