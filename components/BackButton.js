import Link from "next/link";
import styled from "styled-components";

export default function BackButton() {
  return <StyledLink href="/">🔙</StyledLink>;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 2.5rem;
`;
