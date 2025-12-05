
import FavActivityList from "@/components/FavActivitiesList";
import { useFavourites } from "@/hooks/useFavourites";
import useSWR from "swr";


const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export default function FavouritesPage() {
  const { favourites } = useFavourites();


  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!activities) {
    return <h1>Activities not found</h1>;
  }

  const favouriteActivities = activities.filter(
    (activity) => favourites?.includes(activity._id)
  );

  if (!favourites || favouriteActivities.length === 0) {
    return <h1>No favourites yet</h1>;
  }

  return (
    <>
      <h1>Here you can find your favorite pieces</h1>
      <FavActivityList activities={favouriteActivities} favourites={favourites} />
    </>
  );
}
