import ActivityList from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";
import Filter from "@/components/Filter";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage() {
  const [query, setQuery] = useState("");
  return (
    <StyledMain>
      <h1>Activity Planner</h1>
      <ActivityForm />
      <ActivityList query={query} setQuery={setQuery} />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
