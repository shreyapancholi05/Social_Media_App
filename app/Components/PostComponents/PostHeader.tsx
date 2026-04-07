import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string;
  replyTo?: string;
}
dayjs.extend(relativeTime);
function PostHeader({
  username,
  name,
  timestamp,
  text,
  replyTo,
}: PostHeaderProps) {
  return (
    <div className="flex py-6 px-6 space-x-5 ">
      <Image
        src="/assets/profile.jpg"
        alt="profile"
        width={44}
        height={44}
        className="w-11 h-11 z-10 bg-white rounded-full object-cover"
      />

      <div className="text-lg flex flex-col space-y-1.5">
        <div className="flex space-x-1.5 text-purple-850">
          <span className="font-bold text-purple-950 inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-15 min-[400px]:max-w-25 min-[500px]:max-w-35 sm:max-w-40">
            {name}
          </span>
          <span className="text-[16px] pt-0.5 text-gray-500 inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-15 min-[400px]:max-w-25 min-[500px]:max-w-35 sm:max-w-40">
            @{username}
          </span>

          <span className="text-gray-600 text-[16px] pt-0.5">
            {timestamp ? dayjs(timestamp.toDate()).fromNow() : "."}
          </span>
        </div>

        <span>{text}</span>

        {replyTo && (
          <span className="text-sm text-gray-400">
            Replying to <span className="text-amber-400">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default PostHeader;
