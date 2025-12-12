import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";
import FavoriteButton from "./FavouriteButton";
import { useFavourites } from "@/hooks/useFavourites";
import WeatherInfo from "./WeatherInfo";

export default function ActivityDetails({ activity, id }) {
  const { toggleFavourite, getIsFavourite } = useFavourites();

  const isFavourite = getIsFavourite(id);

  const location =
    activity.area && activity.country
      ? `${activity.area}, ${activity.country}`
      : activity.country || null;

  return (
    <StyledMain>
      <ActivityInfo
        activity={activity}
        isFavourite={isFavourite}
        onClick={() => toggleFavourite(id)}
      />
      <WeatherInfo location={location} />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
