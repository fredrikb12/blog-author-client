import { Link } from "react-router-dom";

function Header() {
  return (
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
  );
}

export default Header;
