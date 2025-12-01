import ActivityDetails from "@/components/ActivityDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(id ? `/api/activities/${id}` : null);

  if (!id || isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Not found</h1>;
  }

  async function handleDeleteActivity(id) {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.log(response.status);
    }
  }

  return (
    <>
      <ActivityDetails
        activity={activity}
        id={id}
        onClick={handleDeleteActivity}
      />
    </>
  );
}
