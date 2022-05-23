import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";
import Comment from "./Comment";
import ConfirmDelete from "./ConfirmDelete";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [show, setShow] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const dialog = useRef(null);

  async function handleClick(type, item) {
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
      setPost(() => data.post);
    }
    loadPost();
  }, [postId]);

  return (
    <div>
      <div>
        <p>{post.title}</p>
        <p>{post.text}</p>
      </div>
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
      {show && (
        <ConfirmDelete
          show={show}
          item={commentToDelete}
          handleClick={handleClick}
          ref={dialog}
        />
      )}
    </div>
  );
}

export default Post;
