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
  StyledFileInput,
  StyledSubmitButton,
  StatusMessage,
  CategoryGroup,
  CategoryTitle,
  CategoryList,
  CategoryItem,
  CategoryLabel,
  ToggleButton,
  SectionHeader,
} from "./StyledActivityForm";
import Image from "next/image";

export default function ActivityForm({ initialData, onSubmit, onCancel }) {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR("/api/categories");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const isEditMode = Boolean(initialData);

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

    let imageUrl = initialData?.imageUrl;
    let imagePublicId = initialData?.imagePublicId;

    const newImage = formData.get("imageUpload");
    if (newImage && newImage.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("imageUpload", formData.get("imageUpload"));

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploaded = await uploadResponse.json();
      imageUrl = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    if (categoriesArray.length === 0) {
      setErrorMessage("Please select at least one category.");
      return;
    }

    const activityData = {
      title: formData.get("title"),
      description: formData.get("description"),
      area: formData.get("area"),
      country: formData.get("country"),
      categories: categoriesArray,
      imageUrl,
      imagePublicId,
    };

    const ok = await onSubmit(activityData);

    if (ok) {
      setSuccessMessage(
        initialData
          ? "Your activity has been successfully updated!"
          : "Your activity was added successfully!"
      );
      setErrorMessage("");
      setPreview(null);

      if (!initialData) event.target.reset();
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  }

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Failed to load categories.</p>;

  return (
    <FormSection>
      {!isEditMode && (
        <SectionHeader>
          <h2>Add your activity</h2>
          <ToggleButton onClick={() => setIsFormOpen((prev) => !prev)}>
            {isFormOpen ? "Hide form" : "Show form"}
          </ToggleButton>
        </SectionHeader>
      )}
      {isEditMode && (
        <SectionHeader>
          <h2>Edit your activity</h2>
        </SectionHeader>
      )}
      {successMessage && (
        <StatusMessage $success>{successMessage}</StatusMessage>
      )}
      {errorMessage && <StatusMessage>{errorMessage}</StatusMessage>}
      <FormContent isOpen={isEditMode || isFormOpen}>
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormLabel htmlFor="activity-title">Title:</StyledFormLabel>
          <StyledFormInput
            id="activity-title"
            type="text"
            name="title"
            defaultValue={initialData?.title}
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
            defaultValue={initialData?.description}
            placeholder="Add a short description"
          />

          <CategoryGroup>
            <CategoryTitle>Choose categories:</CategoryTitle>
            <CategoryList>
              {categories.map((category) => {
                const isChecked =
                  initialData?.categories?.some(
                    (c) => c._id === category._id
                  ) ?? false;

                return (
                  <CategoryItem key={category._id}>
                    <CategoryLabel htmlFor={`category-${category._id}`}>
                      <StyledFormInput
                        type="checkbox"
                        id={`category-${category._id}`}
                        name="categories"
                        value={category._id}
                        defaultChecked={isChecked}
                      />
                      {category.name}
                    </CategoryLabel>
                  </CategoryItem>
                );
              })}
            </CategoryList>
          </CategoryGroup>

          <StyledFormLabel htmlFor="activity-area">Area:</StyledFormLabel>
          <StyledFormInput
            id="activity-area"
            type="text"
            name="area"
            defaultValue={initialData?.area}
            placeholder="e.g. Alps, Black Forest, Lake District"
          />
          <CountryCombobox
            options={countryOptions}
            defaultValue={initialData?.country}
          />

          <StyledFormLabel htmlFor="imageUpload">Image:</StyledFormLabel>
          <StyledFileInput
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

          {!preview && initialData?.imageUrl && (
            <Image
              src={initialData.imageUrl}
              width={200}
              height={200}
              alt="Current image"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          )}

          <StyledSubmitButton type="submit">
            {isEditMode ? "Save changes" : "Create Activity"}
          </StyledSubmitButton>
          {onCancel && (
            <StyledSubmitButton type="button" onClick={onCancel}>
              Cancel
            </StyledSubmitButton>
          )}
        </StyledForm>
      </FormContent>
    </FormSection>
  );
}
