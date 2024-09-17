import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { Logo } from "./logo";
import { UserDropdown } from "./user-dropdown";

export default function Sidenav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">PaperMote</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Books
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <UserDropdown />
      </NavbarContent>
    </Navbar>
  );
}
