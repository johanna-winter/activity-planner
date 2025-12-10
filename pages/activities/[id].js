import ActivityDetails from "@/components/ActivityDetails";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(router.isReady ? `/api/activities/${id}` : null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!activity) {
    return <h1>Activity not found</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  async function handleDeleteActivity(id) {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/?deleted=true");
    } else {
      return alert("Something went wrong. Please try again.");
    }
  }

  if (!activity) {
    return <h1>Activity not found</h1>;
  }

  return (
    <div>
      <ActivityDetails activity={activity} />

      {!showConfirmDelete && (
        <button onClick={() => setShowConfirmDelete(true)}>DELETE</button>
      )}

      {showConfirmDelete && (
        <div>
          <p>Are you sure you want to delete this activity?</p>

          <button onClick={() => handleDeleteActivity(activity._id)}>
            Yes
          </button>
          <button onClick={() => setShowConfirmDelete(false)}>No</button>
        </div>
      )}
    </div>
  );
}
