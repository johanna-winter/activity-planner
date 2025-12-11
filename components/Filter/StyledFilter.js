import styled from "styled-components";

export const FilterForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 1.5rem;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-weight: bold;
  color: var(--grey-900);
`;

export const FilterInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 0.6rem 0.9rem;
  border-radius: 20px;
  border: 1px solid var(--primary-500);
  background: var(--background-200);
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: var(--primary-600);
    box-shadow: 0 0 0 3px rgba(122, 191, 191, 0.25);
  }
`;

export const FilterButton = styled.button`
  padding: 0.6rem 1.25rem;
  margin-left: 0.5rem;
  border-radius: 20px;
  border: 1px solid var(--primary-500);
  background: var(--primary-500);
  color: var(--accent-500);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: var(--primary-600);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(122, 191, 191, 0.25);
  }
`;
