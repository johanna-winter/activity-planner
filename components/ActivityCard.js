import Image from "next/image";

import Link from "next/link";
import FavoriteButton from "./FavouriteButton";

import styled from "styled-components";

export default function ActivityCard({
  activity,
  toggleFavourite,
  isFavourite,
}) {
  return (
    <div>
      <p>{activity.title}</p>
      <FavoriteButton
        isFavourite={isFavourite}
        id={activity._id}
        onClick={() => toggleFavourite(activity._id)}
      />
      <Link href={`/activities/${activity._id}`}>
        <StyledImage src={activity.imageUrl} alt={activity.title} width={1200} height={900} />
      </Link>
      {activity.categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </div>
  );
}

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 500px;
`;
