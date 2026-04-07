import { useGlobalStore } from "@/app/store/GlobalStore";
import PostHeader from "./PostHeader";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/20/solid";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useAuthStore } from "@/app/store/AuthStore";
import { db } from "@/app/Firebase/firebase";

interface PostProps {
  data: DocumentData;
  id: string;
}
function Post({ data, id }: PostProps) {
  const openModal = useGlobalStore((state) => state.openModal);

  const user = useAuthStore((state) => state.user);

  async function likePost() {
    if(!user?.username){
      openModal("login")
      return;
    }
    const postref = doc(db, "posts", id);
    if (data.likes.includes(user?.uid)) {
      await updateDoc(postref, {
        likes: arrayRemove(user?.uid),
      });
    } else {
      await updateDoc(postref, {
        likes: arrayUnion(user?.uid),
      });
    }
  }
  return (
    <div className="border-b border-gray-100">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        ></PostHeader>
      </Link>

      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-6 h-6 cursor-pointer hover:text-amber-300 transition "
            onClick={() => {
              if(!user?.username){
                openModal("login");
                return
              }
              openModal("comment", {
                name: data.name,
                username: data.username,
                text: data.text,
                id: id,
              })
            }}
          />
          {data.comments.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.comments.length}
            </span>
          )}
        </div>
        <div className="relative">
          {data.likes.includes(user?.uid) ? (
            <HeartSolidIcon
              className="w-6 h-6 cursor-pointer text-pink-500 transition "
              onClick={() => likePost()}
            />
          ) : (
            <HeartIcon
              className="w-6 h-6 cursor-pointer hover:text-pink-500 transition "
              onClick={() => likePost()}
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.likes.length}
            </span>
          )}
        </div>
        <div className="relative">
          <ChartBarIcon className="w-6 h-6 cursor-not-allowed  " />
        </div>
        <div className="relative">
          <ArrowUpTrayIcon className="w-6 h-6 cursor-not-allowed " />
        </div>
      </div>
    </div>
  );
}

export default Post;
