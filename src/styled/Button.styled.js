import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 1.2rem;
  padding: 6px 16px;
  border-radius: 12px;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const LightButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.lightAccent};
  color: ${({ theme }) => theme.darkShade};
  box-shadow: 2px 2px 6px 0 #1f1f1f;

  &:hover {
    background-color: ${({ theme }) => theme.lightAccentHover};
  }

  &:focus {
    outline: 3px solid #784e68;
    box-shadow: 0 0 8px 8px #7cc8d9;
  }
`;
