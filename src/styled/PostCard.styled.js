import styled from "styled-components";

export const StyledPostCard = styled.article`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.darkShade};

  &:last-child {
    border-bottom: none;
  }
`;
