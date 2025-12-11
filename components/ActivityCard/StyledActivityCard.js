import styled from "styled-components";
import Image from "next/image";

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

export const Card = styled.section`
  background-color: var(--success-100);
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h2`
  color: var(--accent-500);
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const CategoryList = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin: 1rem 0 1.5rem;
`;

export const CategoryTag = styled.span`
  background: var(--accent-100);
  color: var(--success-100);
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--accent-100);
`;
