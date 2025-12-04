import { useState } from "react";

export default function Filter() {
  
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.query) {
        setQuery(data.query)
    } else {
        setQuery("")
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
