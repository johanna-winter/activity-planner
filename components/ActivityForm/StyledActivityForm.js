import styled from "styled-components";

export const FormSection = styled.div`
  background: #d8f2e6;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
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
  background: #1e1226;
  border: 1px solid #1e1226;
  border-radius: 6px;
  font-weight: bold;
  color: #fff;

  &:hover {
    background: #2a1c35;
  }
`;

export const StatusMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${(props) => (props.$success ? "#e6ffe6" : "#ffe6e6")};
  border: 1px solid ${(props) => (props.$success ? "#00a000" : "#d00000")};
  color: ${(props) => (props.$success ? "#008000" : "#b00000")};
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
  background: #1e1226;
  border: 1px solid #1e1226;
  border-radius: 6px;
  font-weight: bold;
  color: #fff;

  &:hover {
    background: #2a1c35;
  }
`;

export const SectionHeader = styled.div`
  background: #d8f2e6;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
