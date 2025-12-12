import { ActivityListProvider } from "@/components/ActivitiesList/ActivitiesList";
import ActivityForm from "@/components/ActivityForm/ActivityForm";
import { StatusMessage } from "@/components/ActivityForm/StyledActivityForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function HomePage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/activities");
  const [deleteSucess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (router.query.deleted === "true") {
      setDeleteSuccess(true);

      router.replace("/", undefined, { shallow: true });
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
  }, [router]);

  async function handleCreateActivity(activityData) {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      mutate();
      return true;
    }
    return false;
  }

  return (
    <>
      {deleteSucess && (
        <StatusMessage $success>
          Activity was successfully deleted!
        </StatusMessage>
      )}
      <ActivityForm onSubmit={handleCreateActivity} />
      <ActivityListProvider />
    </>
  );
}
