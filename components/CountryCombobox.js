import { useState } from "react";
import styled from "styled-components";

export default function CountryCombobox({ options, name, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filteredCountries = options.filter((country) =>
    country.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <CountryWrapper>
      <input type="hidden" name={name} value={selected} id={id} />
      <StyledCountryInput
        type="text"
        placeholder="Search country..."
        value={
          selected
            ? options.find((option) => option.value === selected)?.label
            : query
        }
        onChange={(event) => {
          setQuery(event.target.value);
          setSelected("");
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        role="combobox"
        autoComplete="off"
      />

      {isOpen && (
        <StyledCountryList id={`${id}-listbox`} role="listbox">
          {filteredCountries.length === 0 && <NoResults>No matches</NoResults>}

          {filteredCountries.map((country) => (
            <StyledCountryItem
              key={country.value}
              role="option"
              onMouseDown={() => {
                setSelected(country.value);
                setQuery("");
                setIsOpen(false);
              }}
            >
              {country.label}
            </StyledCountryItem>
          ))}
        </StyledCountryList>
      )}
    </CountryWrapper>
  );
}

const CountryWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledCountryInput = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const StyledCountryList = styled.ul`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0;
  margin: 4px 0 0;
  list-style: none;
`;

const StyledCountryItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`;

const NoResults = styled.li`
  padding: 0.5rem;
  color: #888;
`;
