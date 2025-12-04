import styled from "styled-components";
import NavigationBar from "./Navigation";

export default function Layout({ children }) {
  return (
    <>
      <StyledMain>
        <h1>Activity Planner</h1>
        {children}
      </StyledMain>
      <NavigationBar />
    </>
  );
}

const StyledMain = styled.main`
  padding: 1rem;
  padding-bottom: 80px;
`;
