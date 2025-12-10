import useSWR from "swr";

export default function ActivityList() {
  const { data, isLoading } = useSWR("/api/activities");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  console.log(data);

  return (
    <>
      <h1>hallo</h1>
    </>
  );
}