import styled from "styled-components";
import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity, onDeleteActivity }) {
  return (
    <Wrapper>
      <Card>
        <ActivityInfo activity={activity} />
        <ButtonRow>
          <DeleteButton onClick={() => onDeleteActivity(activity._id)}>
            DELETE
          </DeleteButton>
        </ButtonRow>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: #d8f2e6; 
  border-radius: 16px;
`;

const Card = styled.div`
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const DeleteButton = styled.button`
  background: #bf4e4e;
  color: white;
  padding: 0.7rem 1.3rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #a23e3e;
  }
`;
