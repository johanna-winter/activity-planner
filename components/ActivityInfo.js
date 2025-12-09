import Image from "next/image";
import BackButton from "./BackButton";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useSWRConfig } from "swr";

const ActivityMap = dynamic(() => import("./ActivityMap"), { ssr: false });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityInfo({ activity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formTitle, setFormTitle] = useState(activity.title);
  const [formCategories, setFormCategories] = useState(
    activity.categories.map((c) => c._id)
  );
  const [formArea, setFormArea] = useState(activity.area || "");
  const [formCountry, setFormCountry] = useState(activity.country || "");
  const [formLat, setFormLat] = useState(activity.coordinates?.lat ?? "");
  const [formLng, setFormLng] = useState(activity.coordinates?.lng ?? "");
  const [error, setError] = useState("");

  const { data: allCategories } = useSWR("/api/categories", fetcher);
  const { mutate } = useSWRConfig();

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

        <StyledBlock>
          <h3>Description:</h3>
          <p>{activity.description}</p>
        </StyledBlock>

        <StyledBlock>
          <h3>Categories:</h3>
          <ul>
            {activity.categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </StyledBlock>

        <StyledBlock>
          <h3>Location:</h3>

          <p>Area: {activity.area || "—"}</p>
          <p>Country: {activity.country || "—"}</p>

          {activity.coordinates?.lat != null &&
            activity.coordinates?.lng != null && (
              <>
                <p>Latitude: {activity.coordinates.lat}</p>
                <p>Longitude: {activity.coordinates.lng}</p>

                <ActivityMap
                  lat={activity.coordinates.lat}
                  lng={activity.coordinates.lng}
                />
              </>
            )}
        </StyledBlock>

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

          let coordinates = null;
          if (formLat && formLng) {
            coordinates = {
              lat: Number(formLat),
              lng: Number(formLng),
            };
          }

          const response = await fetch(`/api/activities/${activity._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: trimmedTitle,
              categories: formCategories,
              area: formArea,
              country: formCountry,
              coordinates,
            }),
          });

          if (!response.ok) {
            setError("Failed to update activity");
            return;
          }

          const updated = await response.json();

          activity.title = updated.title;
          activity.categories = updated.categories;
          activity.area = updated.area;
          activity.country = updated.country;
          activity.coordinates = updated.coordinates;

          mutate("/api/activities");
          mutate(`/api/activities/${activity._id}`);

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
          Area
          <input
            value={formArea}
            onChange={(e) => setFormArea(e.target.value)}
          />
        </label>

        <label>
          Country
          <input
            value={formCountry}
            onChange={(e) => setFormCountry(e.target.value)}
          />
        </label>

        <label>
          Latitude
          <input
            type="number"
            step="any"
            value={formLat}
            onChange={(e) => setFormLat(e.target.value)}
          />
        </label>

        <label>
          Longitude
          <input
            type="number"
            step="any"
            value={formLng}
            onChange={(e) => setFormLng(e.target.value)}
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

const StyledBlock = styled.div`
  margin-bottom: 2rem;
`;

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 600px;
`;
