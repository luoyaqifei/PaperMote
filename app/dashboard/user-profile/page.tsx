"use client";
import { getCurrentUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { UserProfileForm } from "@/app/ui/dashboard/user-profile-form";
import { useEffect, useState } from "react";

export default function UserProfile() {
	const [user, setUser] = useState<User | null>(null);
	
    // TODO: refresh user data on change outside
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const currentUser = await getCurrentUser();
				if (currentUser) {
					setUser(currentUser as User);
				} else {
					console.error('No user data returned');
				}
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchUser();
	}, []);

	if (!user) {
		return <div>Loading...</div>;
	}

	return user && <UserProfileForm user={user}/>
}
