import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Skeleton,
} from "@nextui-org/react";
import Logo from "./logo";
import { UserDropdown } from "../user/user-dropdown";
import { getCurrentUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { colorPalette, fontSize } from "../style-variants/variables";
import { alegreyaSans } from "../fonts";

export default async function Sidenav() {
  const user = await getCurrentUser();
  return (
    <Navbar isBordered maxWidth="full" className={`${colorPalette.secondary} ${alegreyaSans.className}`}>
      <NavbarBrand>
        <Link href="/" className={`flex items-center ${colorPalette.secondary}`}>
          <Logo />
          <p className={`font-bold text-inherit ml-2 ${fontSize.lg}`}>PaperMote</p>
        </Link>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          placeholder
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <UserDropdown user={user as User} />
      </NavbarContent>
    </Navbar>
  );
}
