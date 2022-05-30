import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";
import { DarkButton, StyledButton } from "../styled/Button.styled";
import Comment from "./Comment";
import ConfirmDelete from "./ConfirmDelete";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [show, setShow] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const nav = useNavigate();

  const dialog = useRef(null);

  function handleChange(e) {
    setPost((prevPost) => {
      return { ...prevPost, [e.target.name]: e.target.value };
    });
  }

  async function handleClick(type, item, e) {
    switch (type) {
      case "delete": {
        setCommentToDelete(() => item);
        setShow(() => true);
        break;
      }

      case "deleteConfirm": {
        await postsManager.deleteComment(item._id);
        postsManager.deleteLocalComment(item._id, setPost);
        break;
      }

      case "deleteCancel": {
        setShow(() => false);
        break;
      }

      case "submit": {
        e.preventDefault();
        const response = await postsManager.putPost(item, null);
        console.log(response);
        break;
      }
      default:
        return;
    }
  }

  useEffect(() => {
    function handleWindowClick(e) {
      if (show === false) return;
      if (e.target === dialog.current) return;
      else if (e.target.classList.contains("delete-button")) return;
      else setShow(() => false);
    }

    window.addEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [show]);

  useEffect(() => {
    async function loadPost() {
      const data = await postsManager.fetchPost(postId);
      if (data.status !== 200 && data.status !== 404) nav("/sign-in");
      setPost(() => data.post);
    }
    loadPost();
  }, [postId, nav]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          maxWidth: "800px",
          rowGap: "20px",
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={post.title || ""}
          onChange={handleChange}
        />
        <label htmlFor="text">Text</label>
        <textarea
          name="text"
          value={post.text || ""}
          onChange={handleChange}
          rows="20"
          cols="60"
        />
        <DarkButton
          onClick={(e) => handleClick("submit", { ...post }, e)}
          type="submit"
        >
          Submit Post
        </DarkButton>
      </form>
      <hr style={{ margin: "40px", width: "100%", borderColor: "black" }}></hr>
      <div>
        {post.comments &&
          post.comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                handleClick={handleClick}
              />
            );
          })}
      </div>
      {show && (
        <ConfirmDelete
          show={show}
          item={commentToDelete}
          handleClick={handleClick}
          ref={dialog}
        />
      )}
    </main>
  );
}

export default Post;
