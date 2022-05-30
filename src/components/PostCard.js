import { Link } from "react-router-dom";
import { LightButton } from "../styled/Button.styled";
import {
  StyledPostCard,
  ButtonContainer,
  SmallPara,
} from "../styled/PostCard.styled";

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
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        <SmallPara>
          {post.author ? post.author.first_name + " " : null}
          {post.author ? post.author.last_name : null}
        </SmallPara>
        <SmallPara>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : null}
        </SmallPara>
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
        {post.error && <p>{post.error}</p>}
      </ButtonContainer>
    </StyledPostCard>
  );
}

export default PostCard;
