import { getCurrentUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { UserProfileForm } from "@/app/ui/components/user-profile-form";

export default async function UserProfile() {
  const user = await getCurrentUser();
  return <UserProfileForm user={user as User} />;
}
