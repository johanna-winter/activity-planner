import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data.</p>;
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
  return (
    <>
      <h1>Activities List</h1>
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
              id={activity._id}
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              description={activity.description}
              area={activity.area}
              country={activity.country}
              onActivityUpdated={handleActivityUpdated}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
