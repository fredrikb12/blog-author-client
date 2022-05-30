import styled from "styled-components";

export const StyledPostCard = styled.article`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.darkShade};

  &:last-child {
    border-bottom: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const SmallPara = styled.p`
  color: #2f2f2f;
  font-size: 0.96rem;
`;
