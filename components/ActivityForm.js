import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityForm() {
  const { data: categories, error: categoriesError } = useSWR(
    "/api/categories",
    fetcher
  );
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
    const activityData = Object.fromEntries(formData);
    console.log(activityData);

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      setSuccessMessage("Your activity was added successfully!");
      setErrorMessage("");
      mutate(); // re-fresh ActivitiesList
      event.target.reset();
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
      console.error("Failed to create activity");
    }
  }

  if (!categories) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Failed to load categories.</p>;

  return (
    <>
      <h2>Add your activity</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity-title">Title:</label>
        <input
          id="activity-title"
          type="text"
          name="title"
          maxLength="50"
          required
        />

        <label htmlFor="activity-description">Description:</label>
        <input
          id="activity-description"
          type="text"
          name="description"
          maxLength="300"
        />

        <label htmlFor="activity-categories">Choose a category:</label>
        <select id="activity-categories" name="categories" required>
          {/*Dynamic mapping with category._id*/}
          <option value="">Please select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="activity-area">Area:</label>
        <input id="activity-area" type="text" name="area" />

        <label htmlFor="activity-country">Country:</label>
        <input id="activity-country" type="text" name="country" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
