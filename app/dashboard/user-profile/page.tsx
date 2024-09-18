"use client";
import { updateUser } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { UpdateUserSchema } from "@/app/lib/schema";
import { generateAvatar } from "@/app/lib/utils";
import { useForm, SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<any>(null);
  const [fields, setFields] = useState<any>(null);
const [action, setAction] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      initForm();
    };

    fetchUser();
  }, []);

  function initForm() {
    const [lastResult, action] = useFormState(updateUser, undefined);
      const [newForm, newFields] = useForm({
        lastResult: lastResult as SubmissionResult<string[]> | null,
        onValidate({ formData }) {
          return parseWithZod(formData, { schema: UpdateUserSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        defaultValue: {
          email: user?.email,
          username: user?.username,
        }
      });
      setAction(action);
      setForm(newForm);
      setFields(newFields);
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center mb-6">
        {/* <Avatar
          src={user.avatar ?? generateAvatar("user")}
          alt="User Avatar"
          className="w-24 h-24 mr-6"
        /> */}
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <input
            // label="Username"
            className="mb-4"
            key={fields.username.key}
            name={fields.username.name}
            defaultValue={fields.username.initialValue as string}
          />
          <div>{fields.username.errors}</div>
          <input
            // label="Email"
            type="email"
            className="mb-4"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue as string}
          />
          <div>{fields.email.errors}</div>
          
        </form>
      </div>

      <Button color="primary" className="mt-8" type="submit">
        Save Changes
      </Button>
    </div>
  );
}
