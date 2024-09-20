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
import { useRouter } from "next/navigation";

export function UserDropdown({ user }: { user: User }) {
  const handleSignOut = async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return user ? (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={user?.avatar ?? generateAvatar(user.username)}
          as="button"
          className="transition-transform"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.username}</p>
        </DropdownItem>
        <DropdownItem key="settings" as={Link} href="/dashboard/user-profile">
          My Profile
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button as={Link} color="primary" href="/login" variant="flat">
      Sign In
    </Button>
  );
}
