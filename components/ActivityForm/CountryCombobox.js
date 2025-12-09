import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export default function CountryCombobox({ options }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");

  const filteredCountries = options.filter((country) =>
    country.label.toLowerCase().includes(query.toLowerCase())
  );

  const selectedCountry = options.find(
    (option) => option.label === currentCountry
  );
  const inputValue = selectedCountry ? selectedCountry.label : query;

  const comboboxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <CountryWrapper ref={comboboxRef}>
      <StyledCountryLabel htmlFor="activity-country">
        Country:
      </StyledCountryLabel>

      <StyledCountryInput
        type="text"
        id="activity-country"
        name="country"
        placeholder="Search country..."
        value={inputValue}
        onChange={(event) => {
          setQuery(event.target.value);
          setCurrentCountry("");
          setIsDropdownOpen(true);
        }}
        onFocus={() => setIsDropdownOpen(true)}
        aria-expanded={isDropdownOpen}
        aria-controls="activity-country-listbox"
        role="combobox"
        autoComplete="off"
      />

      {isDropdownOpen && (
        <StyledCountryList id="activity-country-listbox" role="listbox">
          {filteredCountries.length === 0 && <NoResults>No matches</NoResults>}

          {filteredCountries.map((country) => (
            <StyledCountryItem
              key={country.value}
              role="option"
              onMouseDown={() => {
                setCurrentCountry(country.label);
                setQuery("");
                setIsDropdownOpen(false);
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

const StyledCountryLabel = styled.label`
  font-weight: bold;
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
