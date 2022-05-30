import { Link } from "react-router-dom";
import { LightButton, StyledButton } from "../styled/Button.styled";
import { StyledPostCard } from "../styled/PostCard.styled";
import Button from "./Button";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

function PostCard({ post, handleClick }) {
  return (
    <StyledPostCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
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
      <ButtonContainer>
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
      </ButtonContainer>
    </StyledPostCard>
  );
}

export default PostCard;
