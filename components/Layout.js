import styled from "styled-components";
import NavigationBar from "./Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <>
      <StyledMain>
        <Header>
          <Title>Activity Planner</Title>
        </Header>
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

const Header = styled.header`
  background-color: var(--primary-500);
  color: var(--accent-500);

  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 900; /* just under the nav (1000) */
  border-bottom: 1px solid var(--primary-600);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;
