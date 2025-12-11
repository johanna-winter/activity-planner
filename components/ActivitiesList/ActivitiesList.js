import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard/ActivityCard";
import Filter from "@/components/Filter/Filter";
import { useState } from "react";
import { useFavourites } from "@/hooks/useFavourites";
import {
  ListHeading,
  Divider,
  FilterWrapper,
  ActivityGrid,
  ErrorHandling,
} from "./StyledActivitiesList";

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
    return null;
  }

  return <ActivityList activities={activities} mutate={mutate} />;
}

export default function ActivityList({ activities }) {
  const { favourites, toggleFavourite, getIsFavourite } = useFavourites();
  const [query, setQuery] = useState("");

  if (!favourites) {
    return null;
  }

  if (!activities) {
    return null;
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
      <Divider />
      <ListHeading>Activities List</ListHeading>
      <FilterWrapper>
        <Filter onSearch={setQuery} />
      </FilterWrapper>
      {filteredActivities.length === 0 && (
        <ErrorHandling>
          Sorry we couldn´t retrieve the latest activities at the moment. Please
          try again later.
        </ErrorHandling>
      )}
      <ActivityGrid>
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
              isFavourite={getIsFavourite(activity._id)}
              toggleFavourite={toggleFavourite}
            />
          </li>
        ))}
      </ActivityGrid>
    </>
  );
}
