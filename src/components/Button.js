import { DarkButton, LightButton, StyledButton } from "../styled/Button.styled";

function Button({ children, buttonType, ...props }) {
  switch (buttonType) {
    case "DarkButton": {
      return <DarkButton {...props}>{children}</DarkButton>;
    }
    case "LightButton": {
      return <LightButton {...props}>{children}</LightButton>;
    }

    default: {
      return <StyledButton {...props}>{children}</StyledButton>;
    }
  }
}

export default Button;
