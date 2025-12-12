import ActivityList from "@/components/ActivitiesList/ActivitiesList";
import { useActivities } from "@/components/ActivitiesList/ActivitiesList";
import BackButton from "@/components/BackButton";
import { useFavourites } from "@/hooks/useFavourites";
import styled from "styled-components";

export default function FavouritesPage() {
  const { favourites, getIsFavourite } = useFavourites();
  const { activities, error, isLoading } = useActivities();

  if (!favourites) {
    return null;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (!activities) {
    return <h2>Activities not found</h2>;
  }

  const favouriteActivities = activities.filter((activity) =>
    getIsFavourite(activity._id)
  );

  if (favouriteActivities.length === 0) {
    return <h2>No favourites yet</h2>;
  }

  return (
    <>
      <BackButton />
      <FavouritesHeading>
        Here you can find your favorite activities
      </FavouritesHeading>
      <ActivityList activities={favouriteActivities} favourites={favourites} />
    </>
  );
}

const FavouritesHeading = styled.h2`
  text-align: center;
  color: var(--accent-500);
`;
