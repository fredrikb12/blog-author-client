import { Link } from "react-router-dom";
import { LightButton, StyledButton } from "../styled/Button.styled";
import { StyledPostCard } from "../styled/PostCard.styled";
import Button from "./Button";

function PostCard({ post, handleClick }) {
  return (
    <StyledPostCard>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <LightButton
            onClick={() =>
              handleClick("update", { ...post, published: !post.published })
            }
          >
            {post.published ? "Unpublish" : "Publish"}
          </LightButton>
          <LightButton
            className="delete-button"
            onClick={() => handleClick("delete", post)}
          >
            Delete
          </LightButton>
          <p>{post.error ? post.error : ""}</p>
        </div>
      </div>
      <p>{post.text}</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <p>
          {post.author ? post.author.first_name + " " : null}
          {post.author ? post.author.last_name : null}
        </p>
        <p>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : null}
        </p>
      </div>
    </StyledPostCard>
  );
}

export default PostCard;
