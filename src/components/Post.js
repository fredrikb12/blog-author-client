import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postsManager } from "../helpers/postsManager";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

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
            <>
              <p>{comment.author}</p>
              <p>{comment.text}</p>
            </>
          );
        })}
    </div>
  );
}

export default Post;
