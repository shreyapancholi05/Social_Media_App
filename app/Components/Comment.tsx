import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import PostHeader from "./PostComponents/PostHeader";

interface CommentProps {
  name: string
  username: string
  text: string
}
function Comment({name, username, text}: CommentProps) {
  return (
    <div className="border-b border-gray-100">
      <PostHeader
        name={name}
        username={username}
        text={text}
      ></PostHeader>

      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 cursor-not-allowed" />
        <HeartIcon className="w-6 h-6 cursor-not-allowed"></HeartIcon>
        <ChartBarIcon className="w-6 h-6 cursor-not-allowed"></ChartBarIcon>
        <ArrowUpTrayIcon className="w-6 h-6 cursor-not-allowed" />
      </div>
    </div>
  );
}

export default Comment;
