"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import { User } from "@/app/lib/definitions";
import { signOutAction } from "@/app/lib/actions";
import { CogIcon } from "@heroicons/react/24/outline";

export function UserDropdown({ user }: { user: User }) {
  const handleSignOut = async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Skeleton isLoaded={!!user}>
          <Avatar
            src={user.avatar}
            as="button"
            className="transition-transform"
          />
        </Skeleton>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions" variant="flat">
        <DropdownItem key="info" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <Skeleton isLoaded={!!user}>
            <p className="font-semibold">{user?.username}</p>
          </Skeleton>
        </DropdownItem>
        <DropdownItem key="bookshelf" href="/dashboard">
          My Bookshelf
        </DropdownItem>
        <DropdownItem
          key="profile"
          href="/dashboard/user-profile"
          startContent={<CogIcon className="w-4 h-4" />}
        >
          My Profile
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
