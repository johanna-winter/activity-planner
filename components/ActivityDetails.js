import ActivityInfo from "./ActivityInfo";

export default function ActivityDetails({ activity, imageURL, categories }) {
  console.log("logged activity:", activity);
  return (
    <>
      <ActivityInfo activity={activity} imageURL={imageURL} categories={activity.categories}/>
    </>
  );
}
