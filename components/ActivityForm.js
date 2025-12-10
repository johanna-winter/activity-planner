import Image from "next/image";
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

    // image upload gets a different formdata because of the api route
    const uploadFormData = new FormData();
    uploadFormData.append("imageUpload", formData.get("imageUpload"));

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
    });

    const { secure_url, public_id } = await uploadResponse.json();

    const activityData = {
      title: formData.get("title"),
      description: formData.get("description"),
      area: formData.get("area"),
      country: formData.get("country"),
      categories: categoriesArray,
      imageUrl: secure_url,
      imagePublicId: public_id,
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
    <>
      <h2>Add your activity</h2>
      {successMessage && (
        <StatusMessage $success>{successMessage}</StatusMessage>
      )}
      {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="activity-title">Title:</StyledLabel>
        <StyledInput
          id="activity-title"
          type="text"
          name="title"
          maxLength="50"
          placeholder="Name your activity (e.g. Kayaking)"
          required
        />

        <StyledLabel htmlFor="activity-description">Description:</StyledLabel>
        <StyledInput
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
                  <StyledInput
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
        <StyledInput
          id="activity-area"
          type="text"
          name="area"
          placeholder="e.g. Alps, Black Forest, Lake District"
        />

        <StyledLabel htmlFor="activity-country">Country:</StyledLabel>
        <StyledInput
          id="activity-country"
          type="text"
          name="country"
          placeholder="e.g. Switzerland, Germany, UK"
        />

        <label htmlFor="imageUpload">Image:</label>
        <input type="file" name="imageUpload" accept="image/*" />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const StatusMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${(props) => (props.$success ? "#e6ffe6" : "#ffe6e6")};
  border: 1px solid ${(props) => (props.$success ? "#00a000" : "#d00000")};
  color: ${(props) => (props.$success ? "#008000" : "#b00000")};
`;

const CategoryGroup = styled.fieldset`
  border: none;
  padding: 0;
  margin: 1rem 0;
`;

const CategoryLegend = styled.legend`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
`;
