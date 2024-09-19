import { getCurrentUser } from "@/app/lib/data";
import { UserProfileForm } from "@/app/ui/dashboard/user-profile-form";

export default async function UserProfile() {
	const user: any = await getCurrentUser();
	return <UserProfileForm user={user}/>
}
