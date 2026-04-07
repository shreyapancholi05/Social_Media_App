"use client";
import { useEffect, useState } from "react";
import PostInput from "./PostInput";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/Firebase/firebase";

import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

function PostFeed() {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs;
      setPosts(snapshotDocs);

      setTimeout(() => setLoading(false), 300);
    });
    return unsubscribe;
  }, []);
  return (
    <div className=" grow max-w-2xl border-gray-100 border-x">
      <div className="py-4 mt-3 px-5 text-lg sm:text-2xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-gray-100 border-b">
        Home
      </div>
      <PostInput />
      {loading ? (
        <div>
           {[...Array(5)].map((_, i) => (
      <PostSkeleton key={i} />
    ))}
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post.id} data={post.data()} id={post.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostFeed;
