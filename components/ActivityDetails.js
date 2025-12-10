import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";
import FavoriteButton from "./FavButton";
import { useFavourites } from "@/hooks/useFavourites";
import WeatherInfo from "./WeatherInfo";

export default function ActivityDetails({ activity, onDeleteActivity, id }) {
  const { toggleFavourite, getIsFavourite } = useFavourites();

  const isFavourite = getIsFavourite(id);

  const location =
    activity.area && activity.country
      ? `${activity.area}, ${activity.country}`
      : activity.country || null;

  return (
    <StyledMain>
      <FavoriteButton
        isFavourite={isFavourite}
        onClick={() => toggleFavourite(id)}
      />
      <ActivityInfo activity={activity} />
      <WeatherInfo location={location} />
      <button onClick={() => onDeleteActivity(activity._id)}>DELETE</button>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
