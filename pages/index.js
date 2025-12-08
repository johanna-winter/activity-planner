import { ActivityListProvider } from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";
import styled from "styled-components";

export default function HomePage() {
  return (
    <StyledMain>
      <h1>Activity Planner</h1>
      <ActivityForm />
      <ActivityListProvider />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
