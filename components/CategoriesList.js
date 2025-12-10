import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

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