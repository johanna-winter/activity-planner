export default function ActivityForm() {
  return (
    <>
      <form>
        <label htmlFor="activity-title">Title:</label>
        <input id="activity-title" type="text" maxLength={50} />
        <label htmlFor="activity-description">Description:</label>
        <input id="activity-description" type="text" maxLength={500} />
        <label htmlFor="activity-categories">Choose a category:</label>
        <select id="activity-categories" name="categories">
          <option value={nature}>Nature</option>
          <option value={water}>Water</option>
          <option value={adventure}>Adventure</option>
          <option value={outdoor}>Outdoor</option>
        </select>
        <label htmlFor="activity-area">Area:</label>
        <input id="activity-area" type="text" name="area" />
        <label htmlFor="activity-country" type="text" name="country">
          Country:
        </label>
        <button type="button">Submit</button>
      </form>
    </>
  );
}
