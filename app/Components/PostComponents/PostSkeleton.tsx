const PostSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-gray-100 p-4">
      <div className="flex space-x-3">
        <div className="w-11 h-11 bg-gray-300 rounded-full"></div>

        <div className="flex-1 space-y-6">
         
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      <div className="ml-16 mt-8 flex space-x-15 space-y-8">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;