import styled from "styled-components";

export const Nav = styled.nav`
  background-color: #7abfbf;
  color: #0d0d0d;
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: 0;
  z-index: 1000;
  margin: 0;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li``;
