import Link from "next/link";
import styled from "styled-components";

export const Nav = styled.nav`
  background-color: #7abfbf;
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
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #1e1236;
  cursor: pointer;
`;
