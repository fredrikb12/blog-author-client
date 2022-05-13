import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function HomeRoute() {
  const [user] = useOutletContext();
  const nav = useNavigate();
  useEffect(() => {
    if (user) nav("/post");
    else nav("/sign-in");
  }, [user, nav]);
}

export default HomeRoute;
