import { useEffect, useState } from "react";

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: false,
  });

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
      console.log(res);
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
        gridTemplateColumns: "150px 500px",
        gap: "25px",
        padding: "25px",
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
      <textarea name="text" value={formData.text} onChange={handleChange} />

      <label htmlFor="published">Published:</label>
      <input
        type="checkbox"
        name="published"
        value={formData.published}
        onChange={handleChange}
      />

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default NewPost;
