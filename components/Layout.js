import styled from "styled-components";
import NavigationBar from "./Navigation/Navigation";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <>
      <StyledMain>
        <Header>
          <HeaderContent>
            <Image
              src="/img/activity-icon.png"
              alt="Activity Planner Logo"
              width={44}
              height={44}
              priority
            />
            <Title>Activity Planner</Title>
          </HeaderContent>
        </Header>
        {children}
      </StyledMain>
      <NavigationBar />
    </>
  );
}

const StyledMain = styled.main`
  padding: 80px 1rem 80px 1rem;
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

  z-index: 900;
  border-bottom: 1px solid var(--primary-600);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: var(--accent-500);
  text-shadow: -1px -1px 0 var(--accent-100);
`;
