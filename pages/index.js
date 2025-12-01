import ActivityList from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm";

export default function HomePage() {
  return (
    <div>
      <h1>Activity Planner</h1>
      <ActivityForm />
      <ActivityList />
    </div>
  );
}
