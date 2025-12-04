import ActivityList from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";
import Filter from "@/components/Filter";
import styled from "styled-components";

export default function HomePage() {
  return (
    <StyledMain>
      <h1>Activity Planner</h1>
      <Filter />
      <ActivityForm />
      <ActivityList />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
