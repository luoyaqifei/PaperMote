import { getCurrentUser } from "@/app/lib/data";
import { Avatar, Button, Input } from "@nextui-org/react";

export default async function UserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center mb-6">
        <Avatar
          src={user.avatar ?? "https://api.dicebear.com/9.x/initials/svg?seed=User"}
          alt="User Avatar"
          className="w-24 h-24 mr-6"
        />
        <div>
          <Input
            label="Username"
            defaultValue={user.username}
            className="mb-4"
          />
          <Input
            label="Email"
            defaultValue={user.email}
            type="email"
            className="mb-4"
          />
        </div>
      </div>


      <Button color="primary" className="mt-8">
        Save Changes
      </Button>
    </div>
  );
}
