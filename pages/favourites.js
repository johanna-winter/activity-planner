import { useActivities } from "@/components/ActivitiesList";
import BackButton from "@/components/BackButton";
import FavActivityList from "@/components/FavActivitiesList";
import { useFavourites } from "@/hooks/useFavourites";

export default function FavouritesPage() {
  const { favourites, getIsFavourite } = useFavourites();
  const { activities, error, isLoading } = useActivities();

  if (!favourites) {
    return null;
  }

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
    getIsFavourite(activity._id)
  );

  console.log(favouriteActivities);

  if (favouriteActivities.length === 0) {
    return <h1>No favourites yet</h1>;
  }

  return (
    <>
      <h1>Here you can find your favorite pieces</h1>
      <BackButton />
      <FavActivityList
        activities={favouriteActivities}
        favourites={favourites}
      />
    </>
  );
}

