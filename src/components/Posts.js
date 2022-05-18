import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  function handleStateUpdate(type, data) {
    if (type === "update") {
      setPosts((prevPosts) => {
        return postsManager.updateLocalPost(prevPosts, data);
      });
    } else if (type === "load") {
      setPosts(() => [...data.posts]);
    }
  }

  async function handleClick(post) {
    const response = await postsManager.putPost(post, handleStateUpdate);
    postsManager.handleResponse(response, post, handleStateUpdate);
  }

  useEffect(() => {
    async function initialLoad() {
      const data = await postsManager.fetchPosts();
      handleStateUpdate("load", data);
    }
    initialLoad();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <main>
      <h1>Posts:</h1>
      {posts.map((post) => {
        return (
          <Post key={post._id} post={post} handlePublishUpdate={handleClick} />
        );
      })}
    </main>
  );
}

export default Posts;
