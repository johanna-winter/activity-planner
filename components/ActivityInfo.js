import Image from "next/image";
import BackButton from "./BackButton";
import styled from "styled-components";
import FavoriteButton from "./FavouriteButton";
import { useFavourites } from "@/hooks/useFavourites";

export default function ActivityInfo({ activity }) {
  const { toggleFavourite, getIsFavourite } = useFavourites();

  const isFavourite = getIsFavourite(activity._id);
  return (
    <>
      <BackButton />
      <DetailHeading>See more details of your selected activity:</DetailHeading>

      <ActivityTitle>{activity.title}</ActivityTitle>

      <ImageWrapper>
        <FavoriteButton
          isFavourite={isFavourite}
          onClick={() => toggleFavourite(activity._id)}
        />
        <StyledImage
          alt={activity.title}
          src={activity.imageUrl}
          width={1200}
          height={900}
        />
      </ImageWrapper>
      <InfoBlock>
        <SectionTitle>Description:</SectionTitle>
        <p>{activity.description}</p>
      </InfoBlock>

      <InfoBlock>
        <SectionTitle>Categories:</SectionTitle>
        <ul>
          {activity.categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </InfoBlock>

      <InfoBlock>
        <SectionTitle>Location:</SectionTitle>
        <p>📍 Area: {activity.area}</p>
        <p>🌍 Country: {activity.country}</p>
      </InfoBlock>
    </>
  );
}

const ImageWrapper = styled.section`
  position: relative;
  margin: 1.5rem auto;
  max-width: 600px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const DetailHeading = styled.h2`
  text-align: center;
  color: var(--accent-500);
`;

const InfoBlock = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--success-100);
  border-radius: 12px;
  border-left: 5px solid var(--primary-600);
`;

const ActivityTitle = styled.h2`
  text-align: center;
  color: var(--success-500);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h4`
  margin: 0 0 0.5rem;
  font-weight: 600;
  color: var(--accent-500);
`;
