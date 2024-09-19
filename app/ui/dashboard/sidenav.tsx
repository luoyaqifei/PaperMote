import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Logo from "./logo";
import { UserDropdown } from "../user/user-dropdown";
import { getCurrentUser } from "@/app/lib/data";

export default async function Sidenav() {
  const user: any = await getCurrentUser();
  return (
    <Navbar isBordered maxWidth="full" className="bg-teal-600 text-white">
      <NavbarBrand>
        <Link href="/" className="flex items-center text-white">
          <Logo />
          <p className="font-bold text-inherit ml-2">PaperMote</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          placeholder
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <UserDropdown user={user} />
      </NavbarContent>
    </Navbar>
  );
}
