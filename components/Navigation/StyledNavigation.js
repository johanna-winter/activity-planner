import { Heart, House } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import css from "styled-jsx/css";

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
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${(props) => (props.$highlighted ? "#6bb0b0" : "#7abfbf")};

  &:hover {
    background-color: #6bb0b0;
    cursor: pointer;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #1e1226;

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
    stroke: #0d0d0d;
    fill: #1e1226;
  }

  ${(props) =>
    props.$highlighted &&
    css`
      stroke: #0d0d0d;
      fill: #1e1226;
    `}
`;

export const StyledHeart = styled(Heart)`
  width: 32px;
  height: 32px;
  stroke-width: 2;

  ${NavItem}:hover & {
    stroke: #0d0d0d;
    fill: #1e1226;
  }

  ${(props) =>
    props.$highlighted &&
    css`
      stroke: #0d0d0d;
      fill: #1e1226;
    `}
`;
