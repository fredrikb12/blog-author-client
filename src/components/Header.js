import { Link } from "react-router-dom";
import { StyledHeader } from "../styled/Header.styled";

function Header() {
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            <Link to="/posts">Home</Link>
          </li>
          <li>
            <Link to="/posts/new">New</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;
