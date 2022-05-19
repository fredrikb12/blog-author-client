import { Link } from "react-router-dom";

function PostCard({ post, handleClick }) {
  return (
    <article>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => handleClick("update", post)}>
            {post.published ? "Unpublish" : "Publish"}
          </button>
          <button
            className="delete-button"
            onClick={() => handleClick("delete", post)}
          >
            Delete
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
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : null}
        </p>
      </div>
    </article>
  );
}

export default PostCard;
