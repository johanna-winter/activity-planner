import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import Filter from "./Filter";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
  } = useSWR("/api/activities", fetcher);

  const [query, setQuery] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!activities) {
    return;
  }

  if (error) {
    return <h1>Failed to load data.</h1>;
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
          Sorry we couldn´t retrieve the latest activites at the moment. Please
          try again later.
        </p>
      )}
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity._id}>
            <ActivityCard
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              id={activity._id}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
