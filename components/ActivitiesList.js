import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityList() {
  const {
    data: activities,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data.</p>;
  }

  if (!activities) {
    return;
  }

  function handleActivityUpdated(updatedActivity) {
    mutate(
      (oldActivities) =>
        oldActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        ),
      false
    );
  }
  return (
    <Wrapper>
      <Title>Activities List</Title>
      {activities.length === 0 && (
        <Message>
          Sorry we couldn´t retrieve the latest activities at the moment. Please
          try again later.
        </Message>
      )}
      <List>
        {activities.map((activity) => (
          <ListItem key={activity._id}>
            <ActivityCard
              id={activity._id}
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              description={activity.description}
              area={activity.area}
              country={activity.country}
              onActivityUpdated={handleActivityUpdated}
            />
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #d8f2e6;
  border-radius: 16px;
`;

const Title = styled.h2`
  text-align: center;
  color: #1e1226;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Message = styled.p`
  color: #1e1226;
  background: #fce2e2;
  border-left: 6px solid #bf9f63;
  padding: 1rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 1rem auto 2rem;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 2rem;
`;
