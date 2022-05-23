import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function HomeRoute() {
  const [user, setUser] = useOutletContext();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/posts");
    else nav("/sign-in");
  }, [user, nav]);
}

export default HomeRoute;
