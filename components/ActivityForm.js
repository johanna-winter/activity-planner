import useSWR from "swr";

export default function ActivityForm() {
  const { mutate } = useSWR("/api/activities");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
    console.log(activityData);

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      mutate(); // re-fresh ActivitiesList
      event.target.reset();
    } else {
      console.error("Failed to create activity");
    }
  }

  return (
    <>
      <h2>Add your activity</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity-title">Title:</label>
        <input
          id="activity-title"
          type="text"
          name="title"
          maxLength="50"
          required
        />

        <label htmlFor="activity-description">Description:</label>
        <input
          id="activity-description"
          type="text"
          name="description"
          maxLength="300"
        />

        <label htmlFor="activity-categories">Choose a category:</label>
        <select id="activity-categories" name="categories" required>
          <option value="">Please select a category</option>
          <option value="outdoor">Outdoor</option>
          <option value="sport">Sport</option>
          <option value="water">Water</option>
          <option value="nature">Nature</option>
          <option value="adventure">Adventure</option>
          <option value="winter">Winter</option>
        </select>
        <label htmlFor="activity-area">Area:</label>
        <input id="activity-area" type="text" name="area" />
        <label htmlFor="activity-country">Country:</label>
        <input id="activity-country" type="text" name="country" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
