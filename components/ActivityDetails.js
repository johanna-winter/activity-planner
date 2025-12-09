import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";
import FavoriteButton from "./FavButton";
import { useFavourites } from "@/hooks/useFavourites";

export default function ActivityDetails({ activity, onDeleteActivity, id }) {
  const { toggleFavourite, getIsFavourite } = useFavourites();

const isFavourite = getIsFavourite(id)

  return (
    <StyledMain>
      <FavoriteButton
        isFavourite={isFavourite}
        onClick={() => toggleFavourite(id)}
      />
      <ActivityInfo activity={activity} />
      <button onClick={() => onDeleteActivity(activity._id)}>DELETE</button>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
