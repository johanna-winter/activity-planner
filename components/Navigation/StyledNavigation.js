import { Heart, House } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import css from "styled-jsx/css";

export const Nav = styled.nav`
  background-color: var(--primary-500);
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
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.$highlighted ? "var(--primary-600)" : "var(--primary-500)"};

  &:hover {
    background-color: var(--primary-600);
    cursor: pointer;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--accent-500);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const StyledHouse = styled(House)`
  width: 32px;
  height: 32px;
  stroke-width: 2;

  ${NavItem}:hover & {
    stroke: var(--accent-500);
    fill: var(--accent-600);
  }

  ${(props) =>
    props.$highlighted &&
    css`
      stroke: var(--accent-600);
      fill: var(--accent-500);
    `}
`;

export const StyledHeart = styled(Heart)`
  width: 32px;
  height: 32px;
  stroke-width: 2;

  ${NavItem}:hover & {
    stroke: var(--accent-600);
    fill: var(--accent-500);
  }

  ${(props) =>
    props.$highlighted &&
    css`
      stroke: var(--accent-600);
      fill: var(--accent-500);
    `}
`;
