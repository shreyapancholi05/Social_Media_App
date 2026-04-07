"use client";
import Image from "next/image";
import {
  PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/Firebase/firebase";
import { useAuthStore } from "@/app/store/AuthStore";
import { useGlobalStore } from "@/app/store/GlobalStore";

interface PostInputProps {
  insideModal?: boolean;
}
function PostInput({ insideModal }: PostInputProps) {
  const [text, setText] = useState("");
  const user = useAuthStore((state) => state.user);
  const selectedPost = useGlobalStore((state) => state.selectedPost);
  const closeModal = useGlobalStore((state) => state.closeModal);
  const openModal = useGlobalStore((state) => state.openModal);
  const sendPost = async () => {
    if (!user?.username) {
      openModal("login");
      return;
    }
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user?.name,
      username: user?.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    setText("");
  };

  const sendComment = async () => {
    if (!user?.username) {
      openModal("login");
      return;
    }
    if (!selectedPost?.id || !text.trim()) return;
    console.log(user?.name);
    console.log(user?.username);

    const postRef = doc(db, "posts", selectedPost.id);
    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user?.name,
        username: user?.username,
        text: text,
        timestamp: new Date(),
      }),
    });
    setText("");
    closeModal();
  };
  return (
    <>
      <div className="flex space-x-5 pt-2 p-1 border-gray-100 border-b">
        <Image
          src={insideModal ? "/assets/profile.jpg" : "/assets/logo.jpg"}
          alt={insideModal ? "Profile picture" : "Image"}
          width={44}
          height={44}
          className="w-11 h-11 z-10 bg-white rounded-full object-cover"
        ></Image>

        <div className="w-full">
          <textarea
            className="outline-none resize-none w-full h-12 mt-1 text-lg"
            placeholder={insideModal ? "Send your reply" : "What's happening?"}
            onChange={(event) => setText(event.target.value)}
            value={text}
          ></textarea>

          <div className="flex justify-between pt-5 border-t border-gray-100 pb-3">
            <div className="flex space-x-2 pt-3">
              <PhotoIcon className="w-6 h-6 text-amber-400" />
              <ChartBarIcon className="w-6 h-6 text-amber-400" />
              <FaceSmileIcon className="w-6 h-6 text-amber-400" />
              <CalendarIcon className="w-6 h-6 text-amber-400" />
              <MapPinIcon className="w-6 h-6 text-amber-400" />
            </div>
            <button
              className="bg-amber-400 w-24 lg:w-28 lg:h-12 h-10  rounded-full text-white font-medium cursor-pointer shadow-md disabled:bg-amber-400/60 disabled:cursor-not-allowed"
              disabled={!text}
              onClick={() => (insideModal ? sendComment() : sendPost())}
            >
              Bumble
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostInput;
