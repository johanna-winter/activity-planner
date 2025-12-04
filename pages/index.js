import ActivityList from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";
import NavigationBar from "@/components/Navigation";
import styled from "styled-components";

export default function HomePage() {
  return (
    <>
      <StyledMain>
        <h1>Activity Planner</h1>
        <ActivityForm />
        <ActivityList />
      </StyledMain>
      <NavigationBar />
    </>
  );
}

const StyledMain = styled.main`
  padding: 1rem;
  padding-bottom: 80px;
`;
