import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkButton } from "../styled/Button.styled";
import Button from "./Button";

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: false,
  });

  const nav = useNavigate();

  function handleChange(e) {
    if (e.target.name === "published") {
      setFormData((prevData) => {
        return { ...prevData, [e.target.name]: e.target.checked };
      });
    } else {
      setFormData((prevData) => {
        return { ...prevData, [e.target.name]: e.target.value };
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, text, published } = formData;

    try {
      const response = await fetch("http://localhost:3000/auth/posts/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          title,
          text,
          published,
        }),
      });
      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      if (res.status === 200 && res.message === "Post submitted") {
        nav(`/posts/${res.post._id}`);
      }
      return res;
    } catch (e) {
      throw new Error(e);
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        maxWidth: "800px",
        gap: "25px",
        padding: "25px",
        margin: "auto",
      }}
    >
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="text">Text:</label>
      <textarea
        name="text"
        value={formData.text}
        onChange={handleChange}
        rows="20"
      />

      <label htmlFor="published">Published:</label>
      <input
        type="checkbox"
        name="published"
        value={formData.published}
        onChange={handleChange}
      />

      <DarkButton type="submit" onClick={handleSubmit}>
        Submit
      </DarkButton>
    </form>
  );
}

export default NewPost;
