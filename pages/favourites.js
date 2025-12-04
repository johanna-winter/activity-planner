import ActivityList from "@/components/ActivitiesList";
import useSWR from "swr";

export default function FavouritesPage({ favourites, onToggleFavourite }) {
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR(`/api/activities/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!activities) {
    return <h1>Activities not found</h1>;
  }

  const favouriteActivities = activities.filter((activity) =>
    favorites.includes(activity._id)
  );

  return (
    <>
      <h1>Here you can find your favorite pieces</h1>
      <ActivityList
        activities={favouriteActivities}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
    </>
  );
}
