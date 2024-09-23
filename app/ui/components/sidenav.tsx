import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  NavbarItem,
} from "@nextui-org/react";
import Logo from "@/app/ui/components/logo";
import { UserDropdown } from "@/app/ui/components/user-dropdown";
import { getCurrentUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { colorPalette, fontSize } from "@/app/ui/style-variants/variables";
import { alegreyaSans } from "@/app/ui/style-variants/fonts";

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
      <NavbarContent justify="end">
        {user 
        ? <UserDropdown user={user as User} /> 
        : <Button href="/login" className={`${colorPalette.secondary} ${alegreyaSans.className}`} as={Link}>Login / Signup</Button>}
      </NavbarContent>
    </Navbar>
  );
}
