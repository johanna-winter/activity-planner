import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity, onClick, id }) {
  console.log("logged activity:", activity);

  return (
    <>
      <ActivityInfo
        activity={activity}
        imageURL={activity.imageURL}
        categories={activity.categories}
      />
      <button onClick={() => onClick(id)}>DELETE</button>
    </>
  );
}
