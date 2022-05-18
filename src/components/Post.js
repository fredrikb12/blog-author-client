import { Link } from "react-router-dom";

function Post({ post, handlePublishUpdate }) {
  return (
    <article key={post._id}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => handlePublishUpdate(post)}>
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
}

export default Post;
