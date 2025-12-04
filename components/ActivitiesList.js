import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";

import { useState, useEffect } from "react";

// eigener kleiner Hook für LocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  // Beim ersten Rendern: Wert aus localStorage laden
  useEffect(() => {
    if (typeof window === "undefined") return; // Sicherheit bei SSR

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, [key]);

  // Immer wenn sich value ändert: in localStorage speichern
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityList() {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  function handleToggleFavourite(id) {
    const isFavorite = favourites.find((favID) => favID === id);

    if (isFavorite) {
      setFavourites(favourites.filter((favID) => favID !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  const {
    data: activities,
    isLoading,
    error,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!activities) {
    return;
  }

  if (error) {
    return <h1>Failed to load data.</h1>;
  }

  return (
    <>
      <h2>Activities List</h2>
      {activities.length === 0 && (
        <p>
          Sorry we couldn´t retrieve the latest activites at the moment. Please
          try again later.
        </p>
      )}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <ActivityCard
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              id={activity._id}
              onClick={handleToggleFavourite}
              favourites={favourites}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
