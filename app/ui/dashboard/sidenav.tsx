import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Logo from "./logo";
import { UserDropdown } from "./user-dropdown";
import { getCurrentUser } from "@/app/lib/data";

export default async function Sidenav() {
  const user = await getCurrentUser();
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
          <Link color="foreground" href="/dashboard/shelf" className="text-white hover:text-teal-200">
            Books
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <UserDropdown user={user} />
      </NavbarContent>
    </Navbar>
  );
}
