import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity, onDeleteActivity }) {
  return (
    <StyledMain>
      <ActivityInfo activity={activity} />
      <button onClick={() => onDeleteActivity(id)}>DELETE</button>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin: 1rem;
`;
