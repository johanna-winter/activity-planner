import ActivityList from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";
import styled from "styled-components";

export default function HomePage() {
  return (
    <StyledMain>
      <PageWrapper>
        <PageTitle>Activity Planner</PageTitle>
        <ActivityForm />
        <ActivityList />
      </PageWrapper>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 1rem;
`;

export const PageWrapper = styled.div`
  background: #d8f2e6;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 4px solid #7abfbf;

  max-width: 900px;
  width: 100%;

  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #1e1226;
  font-weight: 800;

  position: relative;
  display: block;

  &:after {
    content: "";
    display: block;
    height: 4px;
    width: 80px;
    background: #7abfbf;
    margin: 0.4rem auto 0;
    border-radius: 2px;
  }
`;
