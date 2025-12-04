import {
  Nav,
  NavItem,
  NavLink,
  NavList,
  StyledHeart,
  StyledHouse,
} from "./StyledNavigation";

export default function NavigationBar() {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="/">
            <StyledHouse />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/favourites">
            <StyledHeart />
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
