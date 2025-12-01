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

  const { data: activity, error } = useSWR(
    router.isReady ? `/api/activities/${id}` : null,
    fetcher // 👈 lokaler Fetcher
  );

  if (!router.isReady || (!activity && !error)) {
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

  if (!activity) {
    return <h1>Activity not found</h1>;
  }

  return (
    <ActivityDetails
      imageSource={activity.imageUrl}
      activity={activity}
      id={id}
      categories={activity.categories}
      onClick={handleDeleteActivity}
    />
  );
}
