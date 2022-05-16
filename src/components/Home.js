import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function HomeRoute() {
  const [user, setUser] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/posts");
    else nav("/sign-in");
  }, [user, nav]);

  /*useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:3000/auth/posts", {
        credentials: "include",
        method: "GET",
        mode: "cors",
      });
      const data = response.json();
      console.log(data);
    }
    fetchPosts();
  }, [user, nav]);*/
}

export default HomeRoute;
