import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:3000/auth/posts", {
        credentials: "include",
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setPosts(() => data.posts);
    }
    fetchPosts();
  }, []);
  return (
    <div>
      <h1>Posts:</h1>
      {posts.map((post) => {
        return (
          <article key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </article>
        );
      })}
    </div>
  );
}

export default Posts;
