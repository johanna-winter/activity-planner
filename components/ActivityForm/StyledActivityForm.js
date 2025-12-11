import styled from "styled-components";

export const FormSection = styled.section`
  background: var(--background-100);
  padding: 1rem;
  border-radius: 8px;
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
`;

export const StyledSubmitButton = styled.button`
  padding: 0.5rem 1.75rem;
  margin-top: 1rem;
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

export const CategoryGroup = styled.fieldset`
  border: none;
  padding: 0;
  margin: 1rem 0;
`;

export const CategoryLegend = styled.legend`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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
