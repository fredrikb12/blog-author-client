import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomeRoute from "./HomeRoute";
import LoginSuccess from "./LoginSuccess";
import NewPost from "./NewPost";
import Post from "./Post";
import Posts from "./Posts";
import SignIn from "./SignIn";

function RouteSwitch() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeRoute />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/success" element={<LoginSuccess />} />
          <Route path="*" element={<h1>There's nothing here. </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
