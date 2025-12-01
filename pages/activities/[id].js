import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function EditActivityPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activity,
    isLoading,
    error,
  } = useSWR(id ? `/api/activities/${id}` : null, fetcher);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (activity) {
      setTitle(activity.title || "");
    }
  }, [activity]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Failed to load activity</h1>;
  if (!activity) return null;

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      alert("Failed to update activity");
      return;
    }

    router.push("/");
  }

  function handleCancel() {
    router.back();
  }

  return (
    <>
      <h1>Edit Activity</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <div style={{ marginTop: "1rem" }}>
          <button type="submit" disabled={!title.trim()}>
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: "1rem" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}