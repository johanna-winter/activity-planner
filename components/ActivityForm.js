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
    <>
      <h2>Add your activity</h2>
      {successMessage && (
        <StatusMessage $success>{successMessage}</StatusMessage>
      )}
      {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="activity-title">Title:</Label>
        <Input
          id="activity-title"
          type="text"
          name="title"
          maxLength="50"
          placeholder="Name your activity (e.g. Kayaking)"
          required
        />

        <Label htmlFor="activity-description">Description:</Label>
        <Input
          id="activity-description"
          type="text"
          name="description"
          maxLength="300"
          placeholder="Add a short description"
        />

        <Label htmlFor="activity-categories">Choose a category:</Label>
        <Select id="activity-categories" name="categories" multiple required>
          <option value="">Please select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Label htmlFor="activity-area">Area:</Label>
        <Input
          id="activity-area"
          type="text"
          name="area"
          placeholder="e.g. Alps, Black Forest, Lake District"
        />

        <Label htmlFor="activity-country">Country:</Label>
        <Input
          id="activity-country"
          type="text"
          name="country"
          placeholder="e.g. Switzerland, Germany, UK"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
`;

const Button = styled.button`
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
