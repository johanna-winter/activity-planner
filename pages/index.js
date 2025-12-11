import { ActivityListProvider } from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm/ActivityForm";
import { StatusMessage } from "@/components/ActivityForm/StyledActivityForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [deleteSucess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (router.query.deleted === "true") {
      setDeleteSuccess(true);

      router.replace("/", undefined, { shallow: true });
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
  }, [router]);

  return (
    <>
      {deleteSucess && (
        <StatusMessage $success>Activity has been deleted.</StatusMessage>
      )}
      <ActivityForm />
      <ActivityListProvider />
    </>
  );
}
