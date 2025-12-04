export default function Filter({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.filter) {
      onSearch(data.filter);
    } else {
      onSearch("");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="filter">Filter:</label>
        <input type="text" id="filter" name="filter"></input>
        <button>Submit</button>
      </form>
    </>
  );
}
