import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function LoginSuccess() {
  const [completed, setCompleted] = useState(0);
  const [user] = useOutletContext();
  const nav = useNavigate();

  useEffect(() => {
    setInterval(() => {
      return setCompleted((prev) => prev + 200);
    }, 200);
  }, []);

  useEffect(() => {
    if (completed < 4000 || !user) return;
    setCompleted(() => 0);
    nav("/posts");
  }, [completed, user, nav]);

  return (
    <div>
      <h1>{user ? "Successful login!" : "Something went wrong."}</h1>
      {user ? <ProgressBar completed={completed} /> : null}
      {!user ? <Link to="/sign-in">Sign In</Link> : null}
    </div>
  );
}

export default LoginSuccess;
