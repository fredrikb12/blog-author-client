import { useEffect, useState } from "react";
import { fetchPosts } from "../helpers/fetchPosts";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function initialLoad() {
      const data = await fetchPosts();
      setPosts(() => data.posts);
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
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <p>
                {post.author.first_name} {post.author.last_name}
              </p>
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </article>
        );
      })}
    </main>
  );
}

export default Posts;
