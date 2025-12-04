import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityForm() {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR("/api/categories", fetcher);
  const { mutate } = useSWR("/api/activities", fetcher);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const categoriesArray = formData.getAll("categories");

    if (categoriesArray.length === 0) {
      setErrorMessage("Please select at least one category.");
      return;
    }

    const activityData = {
      ...Object.fromEntries(formData),
      categories: categoriesArray,
    };

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      setSuccessMessage("Your activity was added successfully!");
      setErrorMessage("");
      mutate();
      event.target.reset();
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
      console.error("Failed to create activity");
    }
  }

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Failed to load categories.</p>;

  return (
    <FormWrapper>
      <FormCard>
      <FormTitle>Add your activity</FormTitle>
      {successMessage && (
        <StatusMessage $success>{successMessage}</StatusMessage>
      )}
      {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="activity-title">Title:</StyledLabel>
        <TextInput
          id="activity-title"
          type="text"
          name="title"
          maxLength="50"
          placeholder="Name your activity (e.g. Kayaking)"
          required
        />

        <StyledLabel htmlFor="activity-description">Description:</StyledLabel>
        <TextInput
          id="activity-description"
          type="text"
          name="description"
          maxLength="300"
          placeholder="Add a short description"
        />

        <CategoryGroup>
          <CategoryLegend>Choose categories:</CategoryLegend>
          <CategoryList>
            {categories.map((category) => (
              <CategoryItem key={category._id}>
                <CategoryLabel>
                  <CheckboxInput
                    type="checkbox"
                    id="activity-categories"
                    name="categories"
                    value={category._id}
                    multiple
                  />
                  {category.name}
                </CategoryLabel>
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoryGroup>

        <StyledLabel htmlFor="activity-area">Area:</StyledLabel>
        <TextInput
          id="activity-area"
          type="text"
          name="area"
          placeholder="e.g. Alps, Black Forest, Lake District"
        />

        <StyledLabel htmlFor="activity-country">Country:</StyledLabel>
        <TextInput
          id="activity-country"
          type="text"
          name="country"
          placeholder="e.g. Switzerland, Germany, UK"
        />
        <ButtonRow>
        <SubmitButton type="submit">Submit</SubmitButton>
        </ButtonRow>
      </StyledForm>
      </FormCard>
    </FormWrapper>
  );
}

/* ----------------- STYLES ----------------- */

const FormWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  background-color: #d8f2e6; /* мягкий мятный фон */
  border-radius: 16px;
`;

const FormCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem 1.8rem 2.4rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-top: 8px solid #7abfbf; /* бирюзовый акцент */
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #1e1226;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  color: #1e1226;
`;

const TextInput = styled.input`
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #7abfbf;
  background-color: #f9fdfb;
  margin-bottom: 0.3rem;

  &:focus {
    outline: none;
    border-color: #44a66e;
    box-shadow: 0 0 0 2px rgba(68, 166, 110, 0.25);
  }
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #44a66e;
  color: #ffffff;
  font-weight: 600;

  &:hover {
    background-color: #368757;
  }
`;

const StatusMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  margin-bottom: 1rem;
  background-color: ${(props) => (props.$success ? "#e5f9f0" : "#ffe6e6")};
  border: 1px solid ${(props) => (props.$success ? "#44a66e" : "#d00000")};
  color: ${(props) => (props.$success ? "#1e1226" : "#b00000")};
`;

const CategoryGroup = styled.fieldset`
  border: none;
  padding: 0;
  margin: 1rem 0;
`;

const CategoryLegend = styled.legend`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1e1226;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0.75rem 0.9rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background-color: #f9fdfb;
  border-radius: 12px;
  border: 1px solid #7abfbf;
`;

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
`;

const CategoryLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e1226;
`;
