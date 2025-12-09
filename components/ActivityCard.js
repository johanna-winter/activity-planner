import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import FavoriteButton from "./FavButton";

import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityCard({
  id,
  title,
  imageSource,
  categories,
  onActivityUpdated,
  toggleFavourite,
  isFavourite,
  favourites,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formTitle, setFormTitle] = useState(title);
  const [formCategories, setFormCategories] = useState(
    categories.map((c) => c._id)
  );

  const [error, setError] = useState("");

  const { data: allCategories } = useSWR("/api/categories", fetcher);

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    const trimmedTitle = formTitle.trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    if (!formCategories || formCategories.length === 0) {
      setError("Please select at least one category");
      return;
    }

    const response = await fetch(`/api/activities/${id}`, {
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
    onActivityUpdated(updated);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setFormTitle(title);
    setFormCategories(categories.map((c) => c._id));
    setError("");
  }

  return (
    <div>
      <p>{title}</p>
      <FavoriteButton
        isFavourite={isFavourite}
        id={id}
        onClick={() => toggleFavourite(id)}
        favourites={favourites}
      />
      <Link href={`/activities/${id}`}>
        <StyledImage src={imageSource} alt={title} width={1200} height={900} />
      </Link>
      {categories.map((category) => (
        <>
          <p key={category._id}>{category.name}</p>
        </>
      ))}

      {!isEditing && (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      {isEditing && (
        <>
          <h3>Edit Activity</h3>

          {error && <p>{error}</p>}

          <form onSubmit={handleSave}>
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
                  <label
                    key={cat._id}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat._id}
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
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 500px;
`;
