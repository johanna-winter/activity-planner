import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import { useFavourites } from "@/hooks/useFavourites";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useActivities() {
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);
  return { activities, error, isLoading };
}

export default function ActivityList() {
  const { favourites, toggleFavourite, getIsFavourite } = useFavourites();

  const { activities, error, isLoading } = useActivities();

  if (!favourites) {
    return null;
  }

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
              isFavourite={getIsFavourite(activity._id)} // aktueller State
              toggleFavourite={toggleFavourite} // Toggle-Funktion aus dem Hook
              favourites={favourites}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
