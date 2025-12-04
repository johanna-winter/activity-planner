import Image from "next/image";
import BackButton from "./BackButton";
import styled from "styled-components";

export default function ActivityInfo({ activity }) {
  return (
    <PageWrapper>
      <Card>
        <h1>See more Details of your selected activity</h1>

        <BackRow>
          <BackButton />
        </BackRow>

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
      </Card>
    </PageWrapper>
  );
}

// const StyledP = styled.p`
//   margin-bottom: 2rem;
// `;

// const StyledImage = styled(Image)`
//   width: 100% !important;
//   height: auto !important;
//   object-fit: cover;
//   border-radius: 8px;
//   max-width: 600px;
// `;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #d8f2e6;
  padding: 3rem 1rem;
`;

const Card = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2.5rem 2rem 3rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-top: 8px solid #7abfbf;

  h1 {
    text-align: center;
    color: #1e1226;
    margin-bottom: 1rem;
  }

  h2 {
    text-align: center;
    color: #44a66e;
    margin-bottom: 1.5rem;
  }
`;

const BackRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledP = styled.div`
  margin-bottom: 1.8rem;
  padding: 1.2rem 1rem;
  border-radius: 12px;
  background-color: #f9fdfb;
  border-left: 6px solid #7abfbf;

  h3 {
    margin: 0 0 0.4rem;
    color: #1e1226;
  }

  p,
  ul {
    margin: 0;
  }

  ul {
    padding-left: 1.2rem;
  }
`;

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  max-width: 600px;
  margin: 0 auto 2rem;
  display: block;
  border-radius: 14px;
  border: 4px solid #bf9f63;
`;
