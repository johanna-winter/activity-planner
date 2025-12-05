import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import { useFavourites } from "@/hooks/useFavourites";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityList() {
  // gemeinsamer Favourites-Hook (wird auch in ActivityDetails genutzt)
  const { favourites, toggleFavourite, getIsFavourite } = useFavourites();

  const {
    data: activities,
    isLoading,
    error,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Failed to load data.</h1>;
  }

  if (!activities) {
    return null;
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
              isFavourite = {getIsFavourite(activity._id)}        // aktueller State
              onToggleFavourite={toggleFavourite}  // Toggle-Funktion aus dem Hook

            />
          </li>
        ))}
      </ul>
    </>
  );
}
