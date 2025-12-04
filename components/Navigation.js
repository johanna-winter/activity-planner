import { useRouter } from "next/router";
import {
  Nav,
  NavItem,
  NavLink,
  NavList,
  StyledHeart,
  StyledHouse,
} from "./StyledNavigation";

export default function NavigationBar() {
  const router = useRouter();

  return (
    <Nav>
      <NavList>
        <NavItem $highlighted={router.pathname === "/"}>
          <NavLink href="/">
            <StyledHouse $highlighted={router.pathname === "/"} />
          </NavLink>
        </NavItem>
        <NavItem $highlighted={router.pathname === "/favourites"}>
          <NavLink href="/favourites">
            <StyledHeart $highlighted={router.pathname === "/favourites"} />
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
