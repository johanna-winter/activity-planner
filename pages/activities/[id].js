import ActivityDetails from "@/components/ActivityDetails";
import ActivityForm from "@/components/ActivityForm/ActivityForm";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

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
    <PageWrapper>
      {!isEditing && (
        <>
          <ActivityDetails id={id} activity={activity} />
          <ButtonWrapper>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            <DeleteButton onClick={() => setShowConfirmDelete(true)}>
              Delete
            </DeleteButton>
          </ButtonWrapper>
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
        <ButtonWrapper>
          <p>Are you sure you want to delete this activity?</p>
          <DeleteButton onClick={() => handleDeleteActivity(activity._id)}>
            Yes
          </DeleteButton>
          <DeleteButton onClick={() => setShowConfirmDelete(false)}>
            No
          </DeleteButton>
        </ButtonWrapper>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  margin: 1rem;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const EditButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--accent-500);
  background: var(--accent-500);
  color: var(--background-200);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: var(--accent-600);
  }
`;

const DeleteButton = styled(EditButton)`
  background: var(--error-500);
  border-color: var(--error-500);

  &:hover {
    background: var(--error-300);
  }
`;
