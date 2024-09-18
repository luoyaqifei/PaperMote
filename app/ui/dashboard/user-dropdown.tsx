"use client";
import { getCurrentUser } from "@/app/lib/data";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { User } from "@/app/lib/definitions";
import { signOutAction } from "@/app/lib/actions";
import { generateAvatar } from "@/app/lib/client-utils";
export function UserDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData as User);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setPending(false);
      }
    };
    fetchUser();
  }, []);

  if (pending) {
    return <div>Loading...</div>;
  }
  return user ? (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={
            user?.avatar ??
            generateAvatar(user.username)
          }
          as="button"
          alt="Avatar"
          className="overflow-hidden rounded-full"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem key="profile" className="flex flex-col items-start py-2" isReadOnly>
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-semibold text-lg">{user?.username}</p>
        </DropdownItem>
        <DropdownItem key="settings">
          <Link href="/dashboard/user-profile">My Profile</Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          as="button"
          itemType="submit"
          onClick={(e) => signOutAction()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button>Sign In</Button>
  );
}
