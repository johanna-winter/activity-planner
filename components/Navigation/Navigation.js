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
    <Nav aria-label="Main navigation">
      <NavList>
        <NavItem $highlighted={router.pathname === "/"} title="Home">
          <NavLink
            href="/"
            aria-label="Home"
            aria-current={router.pathname === "/" ? "page" : undefined}
          >
            <StyledHouse $highlighted={router.pathname === "/"} />
          </NavLink>
        </NavItem>
        <NavItem
          $highlighted={router.pathname === "/favourites"}
          title="Favourites"
        >
          <NavLink
            href="/favourites"
            aria-label="Favourites"
            aria-current={
              router.pathname === "/favourites" ? "page" : undefined
            }
          >
            <StyledHeart $highlighted={router.pathname === "/favourites"} />
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
