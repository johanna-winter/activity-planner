import Image from "next/image";
import BackButton from "./BackButton";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityInfo({ activity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formTitle, setFormTitle] = useState(activity.title);
  const [formCategories, setFormCategories] = useState(
    activity.categories.map((c) => c._id)
  );
  const [error, setError] = useState("");

  const { data: allCategories } = useSWR("/api/categories", fetcher);

  if (!isEditing) {
    return (
      <>
        <h1>See more Details of your selected activity</h1>

        <BackButton />
        <h2>{activity.title}</h2>

        <StyledImage
          alt={activity.title}
          src={activity.imageUrl}
          width={1200}
          height={900}
        />

        <StyledP>
          <h3>Description:</h3>
          <p>{activity.description}</p>
        </StyledP>

        <StyledP>
          <h3>Categories:</h3>
          <ul>
            {activity.categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </StyledP>

        <StyledP>
          <h3>Location:</h3>
          <p>📍 Area: {activity.area}</p>
          <p>🌍 Country: {activity.country}</p>
        </StyledP>

        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <>
      <h2>Edit Activity</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");

          const trimmedTitle = formTitle.trim();
          if (!trimmedTitle) {
            setError("Title is required");
            return;
          }
          if (formCategories.length === 0) {
            setError("Please select at least one category");
            return;
          }

          const response = await fetch(`/api/activities/${activity._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: trimmedTitle,
              categories: formCategories,
            }),
          });

          if (!response.ok) {
            setError("Failed to update activity");
            return;
          }

          const updated = await response.json();

          activity.title = updated.title;
          activity.categories = updated.categories;

          setIsEditing(false);
        }}
      >
        <label>
          Title
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </label>

        <label>
          Categories
          <div>
            {allCategories?.map((cat) => (
              <label key={cat._id} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={formCategories.includes(cat._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormCategories([...formCategories, cat._id]);
                    } else {
                      setFormCategories(
                        formCategories.filter((id) => id !== cat._id)
                      );
                    }
                  }}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    </>
  );
}

const StyledP = styled.p`
  margin-bottom: 2rem;
`;

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 600px;
`;
