async function fetchPosts() {
  const response = await fetch("http://localhost:3000/auth/posts", {
    credentials: "include",
    method: "GET",
    mode: "cors",
  });
  const data = await response.json();
  return data;
}

export { fetchPosts };
