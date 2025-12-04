import { Nav, NavItem, NavLink, NavList } from "./StyledNavigation";
import { House, Heart } from "lucide-react";

export default function NavigationBar() {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="/">
            <House />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/favourites">
            <Heart />
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
