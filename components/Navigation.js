import Link from "next/link";
import { Nav, NavItem, NavList } from "./StyledNavigation";

export default function NavigationBar() {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link href="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link href="/favourites">Favourites</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}
