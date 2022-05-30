import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: ${({ theme }) => theme.darkAccent};
  margin-bottom: 20px;

  ul {
    display: flex;
    list-style: none;
    gap: clamp(100px, 20vw, 300px);
    font-size: 1.5rem;
  }
`;
