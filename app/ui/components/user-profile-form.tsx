"use client";
import { updateUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import { UpdateUserSchema } from "@/app/lib/schema";
import { generateAvatar } from "@/app/lib/client-utils";
import { useForm, SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { useToast } from "@/app/lib/hooks";
import { button } from "@/app/ui/style-variants/button";
import { headline } from "@/app/ui/style-variants/headline";
import { input } from "@/app/ui/style-variants/input";

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
  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <article className="p-6">
      <h1 className={headline({size: "3xl", color: "primary"})}>User Profile</h1>
      <section className="flex items-center mb-6">
        <Avatar
          src={user?.avatar ?? generateAvatar(user.username)}
          alt="Avatar"
          className="w-20 h-20 overflow-hidden rounded-full mr-4"
        />
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate className="space-y-4 flex-grow">
          <Input type="hidden" key={fields.id.key} name={fields.id.name} value={user.id} />
          <Input
            label="Username"
            key={fields.username.key}
            name={fields.username.name}
            defaultValue={fields.username.initialValue as string}
            isInvalid={!!fields.username.errors}
            errorMessage={fields.username.errors}
            classNames={{
              input: input().input(),
              label: input().label(),
              inputWrapper: input().inputWrapper()
            }}
          />
          <Input
            label="Email"
            type="email"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue as string}
            isInvalid={!!fields.email.errors}
            errorMessage={fields.email.errors}
            classNames={{
              input: input().input(),
              label: input().label(),
              inputWrapper: input().inputWrapper()
            }}
          />
          <Button
            type="submit"
            className={button({color: "primary"})}
          >
            Save Changes
          </Button>
          {form.errors && (
            <div className="text-red-500 mt-2">{form.errors}</div>
          )}
        </form>
      </section>
    </article>
  );
};
