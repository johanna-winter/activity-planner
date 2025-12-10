import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity }) {
  return (
    <StyledMain>
      <ActivityInfo activity={activity} />
     
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
