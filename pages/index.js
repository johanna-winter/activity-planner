import { ActivityListProvider } from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm/ActivityForm";

export default function HomePage() {
  return (
    <>
      <ActivityForm />
      <ActivityListProvider />
    </>
  );
}
