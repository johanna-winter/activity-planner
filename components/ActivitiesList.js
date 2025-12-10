import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import Filter from "./Filter";
import { useState } from "react";
import { useFavourites } from "@/hooks/useFavourites";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useActivities() {
  const {
    data: activities,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/activities");
  return { activities, error, isLoading, mutate };
}

export function ActivityListProvider() {
  const { activities, error, isLoading, mutate } = useActivities();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data.</p>;
  }

  if (!activities) {
    return;
  }

  if (error) {
    return <h1>Failed to load data.</h1>;
  }

  return <ActivityList activities={activities} mutate={mutate} />;
}

export default function ActivityList({ activities, mutate }) {
  const { favourites, toggleFavourite, getIsFavourite } = useFavourites();
  const [query, setQuery] = useState("");

  if (!favourites) {
    return null;
  }

  if (!activities) {
    return null;
  }

  function handleActivityUpdated(updatedActivity) {
    mutate(
      (oldActivities) =>
        oldActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        ),
      false
    );
  }

  const filteredActivities = activities.filter((activity) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredTitle = activity.title.toLowerCase().includes(lowerCaseQuery);
    const filteredCategories = activity.categories.some((category) =>
      category.name.toLowerCase().includes(lowerCaseQuery)
    );

    return filteredTitle || filteredCategories;
  });

  return (
    <>
      <h2>Activities List</h2>
      <Filter onSearch={setQuery} />
      {filteredActivities.length === 0 && (
        <p>
          Sorry we couldn´t retrieve the latest activities at the moment. Please
          try again later.
        </p>
      )}
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity._id}>
            <ActivityCard
              id={activity._id}
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              description={activity.description}
              area={activity.area}
              country={activity.country}
              onActivityUpdated={handleActivityUpdated}
              isFavourite={getIsFavourite(activity._id)}
              toggleFavourite={toggleFavourite}
              favourites={favourites}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
