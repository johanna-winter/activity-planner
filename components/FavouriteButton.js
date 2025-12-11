import styled from "styled-components";

export default function FavoriteButton({ isFavourite, onClick }) {
  return (
    <StyledButton aria-label="favourite button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="30"
        viewBox="-10 -8 30 30"
        fill={isFavourite ? "#f89393ff" : "#9a9a9aff"}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: none;
`;
