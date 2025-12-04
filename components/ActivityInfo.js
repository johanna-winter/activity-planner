import Image from "next/image";
import BackButton from "./BackButton";
import styled from "styled-components";

export default function ActivityInfo({ activity }) {
  return (
    <>
      <h1>See more Details of your selected activity</h1>

      <BackButton />
      <h2>{activity.title}</h2>

      <StyledImage
        alt={activity.title}
        src={activity.imageUrl}
        width={1200}
        height={900}
      />

      <StyledP>
        <h3>Description:</h3>
        <p>{activity.description}</p>
      </StyledP>

      <StyledP>
        <h3>Categories:</h3>
        <ul>
          {activity.categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </StyledP>

      <StyledP>
        <h3>Location:</h3>
        <p>📍 Area: {activity.area}</p>
        <p>🌍 Country: {activity.country}</p>
      </StyledP>
    </>
  );
}

const StyledP = styled.p`
  margin-bottom: 2rem;
`;

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 600px;
`;
