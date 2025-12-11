import styled from "styled-components";
import { css } from "styled-components";

export const FormSection = styled.section`
  padding: 1rem;
  margin: 1rem 0;
`;

export const SectionHeader = styled.header`
  background: var(--background-100);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  border-radius: 8px;
  border: 1px solid var(--primary-600);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

export const StyledFormLabel = styled.label`
  font-weight: bold;
`;

export const StyledFormInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--primary-500);
  background-color: var(--background-200);
`;

export const StyledFileInput = styled.input`
  font-family: inherit;
  color: var(--grey-900);

  &::file-selector-button {
    padding: 0.5rem 1.25rem;
    margin-right: 0.75rem;
    cursor: pointer;
    background: var(--primary-500);
    border: 1px solid var(--primary-500);
    border-radius: 6px;
    font-weight: bold;
    color: var(--accent-500);
  }

  &::file-selector-button:hover {
    background: var(--primary-600);
  }
`;

export const StyledSubmitButton = styled.button`
  padding: 0.5rem 1.75rem;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  align-self: flex-start;
  background: var(--accent-500);
  border: 1px solid var(--accent-500);
  border-radius: 6px;
  font-weight: bold;
  color: var(--background-200);

  &:hover {
    background: var(--accent-600);
  }
`;

export const StatusMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${(props) =>
    props.$success ? "var(--success-100)" : "var(--error-100)"};
  border: 1px solid
    ${(props) => (props.$success ? "var(--success-500)" : "var(--error-500)")};
  color: ${(props) =>
    props.$success ? "var(--success-500)" : "var(--error-500)"};
`;

export const CategoryGroup = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CategoryTitle = styled.span`
  font-weight: bold;
  padding-bottom: 0.75rem;
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0.75rem 1rem;
  margin: 0;
  border: 1px solid var(--primary-500);
  border-radius: 8px;
  background-color: var(--background-200);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CategoryItem = styled.li`
  display: flex;
  align-items: center;
`;

export const CategoryLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToggleButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1.75rem;
  cursor: pointer;
  background: var(--accent-500);
  border: 1px solid var(--accent-500);
  border-radius: 6px;
  font-weight: bold;
  color: var(--background-200);

  &:hover {
    background: var(--accent-600);
  }
`;
