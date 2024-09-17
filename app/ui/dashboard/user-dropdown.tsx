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
export function UserDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    getCurrentUser().then((userData) => {
      setUser(userData);
      setPending(false);
    });
  }, []);
  if (pending) {
    return <div>Loading...</div>;
  }
  return user ? (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          size="md"
          className="overflow-hidden rounded-full"
        >
          <Avatar
            src={
              user?.avatar ??
              "https://api.dicebear.com/9.x/initials/svg?seed=User"
            }
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{user?.username}</p>
        </DropdownItem>
        <DropdownItem key="settings">Profile</DropdownItem>
        <DropdownItem key="logout" color="danger">
          <form action={signOutAction}>
            <button type="submit">Sign Out</button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button>Sign In</Button>
  );
}
