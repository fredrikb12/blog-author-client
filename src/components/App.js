import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GlobalStyle } from "../styled/GlobalStyle";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <nav>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "250px",
              fontSize: "1.5rem",
            }}
          >
            <Link to="/posts">
              <li>Home</li>
            </Link>
            <Link to="/posts/new">
              <li>New</li>
            </Link>
          </ul>
        </nav>
      </header>
      <GlobalStyle />
      <Outlet context={[user, setUser]} />
    </>
  );
}

export default App;
