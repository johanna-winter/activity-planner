import ActivityDetails from "@/components/ActivityDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  });

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(
    router.isReady ? `/api/activities/${id}` : null,
    fetcher // 👈 lokaler Fetcher
  );

  if (isLoading) {
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
      router.push("/");
    } else {
      return alert("Something went wrong. Please try again.");
    }
  }

  if (!activity) {
    return <h1>Activity not found</h1>;
  }

  return (
    <ActivityDetails
      activity={activity}
      id={id}
      onClick={handleDeleteActivity}
    />
  );
}
