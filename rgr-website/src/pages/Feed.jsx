import { useEffect, useState } from "react";
import { PB } from "../constants";
import Posts from "../components/Posts";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const request = await PB.collection("posts").getList(1, 25, {
        expand: "user",
        sort: "-created",
      });

      setPosts(request.items);
      setTotalPages(request.totalPages);
    };
    getPosts();
  }, []);

  return (
    posts && (
      <div className="relative">
        <Navbar />
        <div className="px-8 py-6 justify-center flex flex-row">
          <Posts posts={posts} isProfile={false} />
        </div>
      </div>
    )
  );
};

export default Feed;
