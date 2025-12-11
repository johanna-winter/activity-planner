import styled from "styled-components";

export const ListHeading = styled.h2`
  text-align: center;
  color: var(--accent-500);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--primary-600);
  margin: 2rem 0;
`;

export const FilterWrapper = styled.section`
  margin-bottom: 1.5rem;
`;

export const ActivityGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  justify-items: center;
`;

export const ErrorHandling = styled.p`
  text-align: center;
  padding: 1.5rem;
  background: var(--background-100);
  border-radius: 8px;
  color: var(--grey-900);
`;
