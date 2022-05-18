import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";

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
          <article key={post._id}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button onClick={() => handleClick(post)}>
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <p>{post.error ? post.error : ""}</p>
              </div>
            </div>
            <p>{post.text}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <p>
                {post.author ? post.author.first_name : null}{" "}
                {post.author ? post.author.last_name : null}
              </p>
              <p>
                {post.updatedAt
                  ? new Date(post.updatedAt).toLocaleDateString()
                  : null}
              </p>
            </div>
          </article>
        );
      })}
    </main>
  );
}

export default Posts;
