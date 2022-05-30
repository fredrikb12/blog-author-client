import { useEffect, useState } from "react";
import { postsManager } from "../helpers/postsManager";
import Button from "./Button";

function Comment({ comment, handleClick }) {
  const [editing, setEditing] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(author);
    console.log(text);
  }, [author, text]);

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

  function handleStateUpdate(field, data) {
    if (field === "author") {
      setAuthor(() => data);
    } else if (field === "text") {
      setText(() => data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(() => false);
    postsManager.putComment({ author, text }, comment._id, handleStateUpdate);
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
          <Button buttonType="DarkButton" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button buttonType="DarkButton" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <article
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <div>
          <p>{author || comment.author}</p>
          <p>{text || comment.text}</p>
        </div>
        <div>
          <Button
            buttonType="DarkButton"
            onClick={() => setEditing(() => true)}
          >
            Edit
          </Button>
          <Button
            buttonType="DarkButton"
            className="delete-button"
            onClick={() => handleClick("delete", comment)}
          >
            Delete
          </Button>
        </div>
      </article>
    );
  }
}

export default Comment;
