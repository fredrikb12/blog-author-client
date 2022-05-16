import { StyledProgressBar } from "../styled/ProgressBar.styled";

function ProgressBar({ completed }) {
  return (
    <StyledProgressBar>
      <div
        style={{
          opacity: 1,
          width: `${parseInt(completed)}%`,
          maxWidth: "100%",
        }}
      ></div>
    </StyledProgressBar>
  );
}

export default ProgressBar;
