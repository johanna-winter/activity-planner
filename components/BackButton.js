import Link from "next/link";
import styled from "styled-components";

export default function BackButton() {
  return <BackLink href="/">Back</BackLink>;
}

const BackLink = styled(Link)`
  display: inline-block;
  margin: 1rem 0.25rem;

  padding: 0.5rem 1rem;
  border-radius: 6px;

  background: var(--primary-500);
  color: var(--accent-500);
  font-weight: 600;
  text-decoration: none;

  border: 1px solid var(--primary-500);

  &:hover {
    background: var(--primary-600);
    color: var(--accent-500);
  }
`;
