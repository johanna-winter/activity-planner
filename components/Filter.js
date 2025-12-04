import { useState } from "react";

export default function Filter({ setQuery }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.filter) {
      setQuery(data.filter);
    } else {
      setQuery("");
    }

    console.log(data);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Filter:</label>
        <input name="filter"></input>
        <button>Submit</button>
      </form>
    </>
  );
}
