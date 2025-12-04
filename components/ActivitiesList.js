import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";

import { useState, useEffect } from "react";

// UseLocalStorageState hat nicht funktioniert, da unsere Komponente zuerst serverseitig gerendert wird, und localStorage auf dem Server nicht existiert.
// Daher ist localStorage auf dem Server undefined. Habe ChatGPT gefragt, was man tun kann. Der Vorschlag war, als "Workaround" einen eigenen Hook zu schreiben.
// In der function useLocalStorage legen wir die Parameter key und initialValue fest. Diese werden später zu "favourites" und dem initial leeren favourites Array im LS
//
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  // Auf dem Server gibt es kein window.
  // Die Abfrage, ob typeof window undefined ist, verhindert, dass wir auf localStorage zugreifen, bevor der Browser da ist
  // Wir lesen dann zuerst aus localStorage den gespeicherten Wert.
  // Nur wenn etwas im localStorage existiert, wollen wir es übernehmen, sonst bleibt initialValue. (wird sichergestellt durch storedValue !== null)
  // localStorage speichert alles als Text, deswegen muss es noch konvertiert werden in Wert (also wieder Number)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, [key]);

  // Dieser Effekt schreibt die Änderung in den Local Storage
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
  // Hier wird der Hook dann benutzt und mit dem key und initialValue befüllt
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

  // Team-ToDo: Ist wahrscheinlich sinnvoller, hier die gesamte activity an die ActivityCard zu übergeben, und nicht title, imageSource, etc als eigene Prop. Will das aber mit allen besprechen, dass es überall einheitlich ist auch von der Benennung
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
