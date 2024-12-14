import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Posts = ({ posts, isProfile }) => {
  const [data, setData] = useState(posts);

  useEffect(() => setData(posts), [posts]);

  return (
    <div className="flex flex-col gap-4 max-w-lg w-full">
      {data.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isProfile={isProfile}
          setPosts={setData}
        />
      ))}
    </div>
  );
};

export default Posts;
