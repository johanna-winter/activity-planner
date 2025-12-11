import { useEffect, useState } from "react";
import useSWR from "swr";
import countries from "world-countries";
import CountryCombobox from "./CountryCombobox";
import {
  FormSection,
  FormContent,
  StyledForm,
  StyledFormLabel,
  StyledFormInput,
  StyledSubmitButton,
  StatusMessage,
  CategoryGroup,
  CategoryLegend,
  CategoryList,
  CategoryItem,
  CategoryLabel,
  ToggleButton,
  SectionHeader,
} from "./StyledActivityForm";
import Image from "next/image";

export default function ActivityForm() {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR("/api/categories");
  const { mutate } = useSWR("/api/activities");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [preview, setPreview] = useState(null);

  const countryOptions = countries
    .map((country) => ({ value: country.cca2, label: country.name.common }))
    .sort((a, b) => a.label.localeCompare(b.label));

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
      imagePublicId: public_id
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
      setPreview(null);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
      console.error("Failed to create activity");
    }
  }

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Failed to load categories.</p>;

  return (
    <FormSection>
      <SectionHeader>
        <h2>Add your activity</h2>
        <ToggleButton onClick={() => setIsFormOpen((prev) => !prev)}>
          {isFormOpen ? "Hide form" : "Show form"}
        </ToggleButton>
      </SectionHeader>
      {successMessage && (
        <StatusMessage $success>{successMessage}</StatusMessage>
      )}
      {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
      <FormContent isOpen={isFormOpen}>
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormLabel htmlFor="activity-title">Title:</StyledFormLabel>
          <StyledFormInput
            id="activity-title"
            type="text"
            name="title"
            maxLength="50"
            placeholder="Name your activity (e.g. Kayaking)"
            required
          />
          <StyledFormLabel htmlFor="activity-description">
            Description:
          </StyledFormLabel>
          <StyledFormInput
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
                  <CategoryLabel htmlFor={`category-${category._id}`}>
                    <StyledFormInput
                      type="checkbox"
                      id={`category-${category._id}`}
                      name="categories"
                      value={category._id}
                    />
                    {category.name}
                  </CategoryLabel>
                </CategoryItem>
              ))}
            </CategoryList>
          </CategoryGroup>
          <StyledFormLabel htmlFor="activity-area">Area:</StyledFormLabel>
          <StyledFormInput
            id="activity-area"
            type="text"
            name="area"
            placeholder="e.g. Alps, Black Forest, Lake District"
          />
          <StyledFormLabel htmlFor="imageUpload">Image:</StyledFormLabel>{" "}
          <StyledFormInput
            type="file"
            name="imageUpload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <Image
              src={preview}
              width={200}
              height={200}
              alt="Preview"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          )}
          <CountryCombobox options={countryOptions} />
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
        </StyledForm>
      </FormContent>{" "}
    </FormSection>
  );
}
