import { StyledButton } from "../styled/Button.styled";

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
