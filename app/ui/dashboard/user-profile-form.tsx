"use client";
import { updateUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import { UpdateUserSchema } from "@/app/lib/schema";
import { generateAvatar } from "@/app/lib/client-utils";
import { useForm, SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

export const UserProfileForm = ({ user }: { user: User }) => {
  const [lastResult, action] = useFormState(updateUser, undefined);
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateUserSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      id: user?.id,
      email: user?.email,
      username: user?.username,
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center mb-6">
        <Avatar
          src={user?.avatar ?? generateAvatar("user")}
          as="button"
          alt="Avatar"
          className="overflow-hidden rounded-full"
        />
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <Input type="hidden" key={fields.id.key} name={fields.id.name} value={user.id} />
          <Input
            label="Username"
            className="mb-4"
            key={fields.username.key}
            name={fields.username.name}
            defaultValue={fields.username.initialValue as string}
          />
          <div>{fields.username.errors}</div>
          <Input
            label="Email"
            type="email"
            className="mb-4"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue as string}
          />
          <div>{fields.email.errors}</div>
          <Button
            color="primary"
            className="mt-8"
            type="submit"
            onClick={() => {
              console.log(form.value);
              console.log("clicked");
            }}
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};
