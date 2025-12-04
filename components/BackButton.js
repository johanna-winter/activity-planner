import Link from "next/link";
import styled from "styled-components";

export default function BackButton() {
  return (
   <ButtonWrapper>
    <StyledLink href="/">
      🔙
    </StyledLink>
   </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #7abfbf;
  color: white;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #5fa9a9;
    transform: translateY(-2px);
  }
`;
