import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomeRoute from "./Home";
import Posts from "./Posts";

function RouteSwitch() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeRoute />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<h1>Post</h1>} />
          <Route path="*" element={<h1>There's nothing here. </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
