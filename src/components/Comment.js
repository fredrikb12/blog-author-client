import { useEffect, useState } from "react";
import { postsManager } from "../helpers/postsManager";

function Comment({ comment }) {
  const [editing, setEditing] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  function handleChange(e) {
    if (e.target.name === "author") {
      setAuthor(() => e.target.value);
      return;
    }
    if (e.target.name === "text") {
      setText(() => e.target.value);
      return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(() => false);
    postsManager.putComment({ author, text }, comment._id);
  }

  function handleCancel(e) {
    setEditing(() => false);
  }

  useEffect(() => {
    setAuthor(() => comment.author);
    setText(() => comment.text);
  }, [comment]);
  if (editing) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
        }}
      >
        <label htmlFor="author" onSubmit={handleSubmit}>
          <input
            name="author"
            type="text"
            value={author}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="text">
          <textarea name="text" value={text} onChange={handleChange} />
        </label>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <article
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <div>
          <p>{comment.author}</p>
          <p>{comment.text}</p>
        </div>
        <div>
          <button onClick={() => setEditing(() => true)}>Edit</button>
          <button onClick={() => postsManager.deleteComment(comment._id)}>
            Delete
          </button>
        </div>
      </article>
    );
  }
}

export default Comment;
