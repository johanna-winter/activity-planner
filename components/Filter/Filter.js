import {
  FilterForm,
  FilterInput,
  FilterButton,
  FilterLabel,
} from "./StyledFilter";

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
    event.reset;
  }

  return (
    <>
      <FilterForm onSubmit={handleSubmit}>
        <FilterLabel htmlFor="filter">Filter:</FilterLabel>
        <FilterInput type="text" id="filter" name="filter"></FilterInput>
        <FilterButton>Submit</FilterButton>
      </FilterForm>
    </>
  );
}
