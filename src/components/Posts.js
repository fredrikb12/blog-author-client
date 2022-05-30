import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";
import { StyledPosts } from "../styled/Posts.styled";
import ConfirmDelete from "./ConfirmDelete";
import PostCard from "./PostCard";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [postToConfirm, setPostToConfirm] = useState({});

  const dialog = useRef();

  useEffect(() => {
    function handleWindowClick(e) {
      if (showConfirm === false) return;
      if (e.target === dialog.current) return;
      else if (e.target.classList.contains("delete-button")) return;
      else setShowConfirm(() => false);
    }

    window.addEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [showConfirm]);

  function handleStateUpdate(type, data) {
    if (type === "update") {
      setPosts((prevPosts) => {
        return postsManager.updateLocalPost(prevPosts, data);
      });
    } else if (type === "load") {
      setPosts(() => [...data.posts]);
    } else if (type === "delete") {
      setPosts((prevPosts) => {
        return postsManager.deleteLocalPost(prevPosts, data);
      });
    }
  }

  async function handleClick(type, post) {
    switch (type) {
      case "update": {
        const response = await postsManager.putPost(post, handleStateUpdate);
        postsManager.handleResponse(response, post, handleStateUpdate);
        break;
      }
      case "delete": {
        setPostToConfirm(() => post);
        setShowConfirm(() => true);
        break;
      }
      case "deleteConfirm": {
        const response = await postsManager.deletePost(post, handleStateUpdate);
        postsManager.handleResponse(response, post, handleStateUpdate);
        break;
      }
      case "deleteCancel": {
        setShowConfirm(() => false);
        break;
      }
      default:
        return;
    }
  }

  useEffect(() => {
    async function initialLoad() {
      const data = await postsManager.fetchPosts();
      if (data.status !== 200) {
        setError(() => {
          return {
            message: data.message,
            status: data.status,
          };
        });
      } else {
        handleStateUpdate("load", data);
        setError(() => null);
      }
    }
    initialLoad();
  }, []);

  return (
    <>
      <StyledPosts>
        {error && (
          <div
            style={{
              padding: "50px",
              fontSize: "1.3rem",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <p>{error.message}</p>
            <p>{"Status: " + error.status}</p>
            {error.status === 403 && <Link to="/sign-in">Sign In</Link>}
          </div>
        )}
        {posts.map((post) => {
          return (
            <PostCard key={post._id} post={post} handleClick={handleClick} />
          );
        })}
      </StyledPosts>
      {showConfirm && (
        <ConfirmDelete
          ref={dialog}
          handleClick={handleClick}
          show={showConfirm}
          item={postToConfirm}
        />
      )}
    </>
  );
}

export default Posts;
