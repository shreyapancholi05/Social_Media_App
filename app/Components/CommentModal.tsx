'use client'
import { useGlobalStore } from "../store/GlobalStore";
import PostHeader from "./PostComponents/PostHeader";
import PostInput from "./PostComponents/PostInput";

function CommentModal() {
  const selectedPost = useGlobalStore((state) => state.selectedPost)
  
  return (
    <>
      
        <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
          
            <PostHeader name={selectedPost?.name || ""}
          username={selectedPost?.username || ""}
          text={selectedPost?.text || ""}
          replyTo={selectedPost?.username}
          ></PostHeader>
          <div className="pt-4 px-5">
          <PostInput
            insideModal = {true}
          ></PostInput>
          
          </div>
          <div className="absolute w-0.5 h-32 bg-gray-300 left-8.25 sm:left-16 top-28 z-0"></div>
        </div>
      
    </>
  );
}

export default CommentModal;
