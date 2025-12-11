import ActivityDetails from "@/components/ActivityDetails";
import ActivityForm from "@/components/ActivityForm/ActivityForm";
import { FormContent } from "@/components/ActivityForm/StyledActivityForm";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: activity,
    error,
    isLoading,
    mutate,
  } = useSWR(router.isReady ? `/api/activities/${id}` : null);

  if (isLoading) return <p>Loading...</p>;
  if (!activity) return <p>Activity not found</p>;
  if (error) return <p>{error.message}</p>;

  async function handleDeleteActivity(id) {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/?deleted=true");
    } else {
      return alert("Failed to delete activity. Please try again.");
    }
  }

  async function handleUpdateActivity(updatedActivity) {
    const response = await fetch(`/api/activities/${activity._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedActivity),
    });

    if (response.ok) {
      mutate();
      setIsEditing(false);
      return true;
    }

    return false;
  }

  return (
    <div>
      {!isEditing && (
        <>
          <ActivityDetails id={id} activity={activity} />

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => setShowConfirmDelete(true)}>Delete</button>
        </>
      )}

      {isEditing && (
        <ActivityForm
          initialData={activity}
          onSubmit={handleUpdateActivity}
          onCancel={() => setIsEditing(false)}
        />
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
