import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({
  activity,
  imageSource,
  onClick,
  id,
}) {
  console.log("logged activity:", activity);

  return (
    <>
      <ActivityInfo
        activity={activity}
        imageSource={imageSource}
        categories={activity.categories}
      />
      <button onClick={() => onClick(id)}>DELETE</button>
    </>
  );
}
