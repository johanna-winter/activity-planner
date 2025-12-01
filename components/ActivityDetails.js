export default function ActivityDetails({ activity }) {
  console.log("logged activity:", activity);
  return (
    <>
      <h1>{activity.title}</h1>
    </>
  );
}
