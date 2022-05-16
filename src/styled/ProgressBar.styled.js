import styled from "styled-components";

export const StyledProgressBar = styled.div`
  height: 20px;
  width: 300px;
  background-color: #e0e0de;
  border-radius: 50px;
  margin: 50px;

  & div {
    height: 100%;
    background: linear-gradient(to left, #f2709c, #ff9472);
    border-radius: inherit;
    transition: width 2s ease-in-out 0s;
  }
`;
