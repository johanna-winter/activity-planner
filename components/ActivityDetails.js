import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity, onDeleteActivity, id }) {
  return (
    <>
      <ActivityInfo activity={activity} />
      <button onClick={() => onDeleteActivity(id)}>DELETE</button>
    </>
  );
}
