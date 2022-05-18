import { useEffect, useRef, useState } from "react";
import { postsManager } from "../helpers/postsManager";
import ConfirmDelete from "./ConfirmDelete";
import PostCard from "./PostCard";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

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
      handleStateUpdate("load", data);
    }
    initialLoad();
  }, []);

  return (
    <>
      <main>
        <h1>Posts:</h1>

        {posts.map((post) => {
          return (
            <PostCard key={post._id} post={post} handleClick={handleClick} />
          );
        })}
      </main>
      {showConfirm && (
        <ConfirmDelete
          ref={dialog}
          handleClick={handleClick}
          show={showConfirm}
        />
      )}
    </>
  );
}

export default Posts;
