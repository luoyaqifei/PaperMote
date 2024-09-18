"use client";
import React from "react";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { SignupSchema } from "@/app/lib/schema";

export default function LoginForm() {
  const [lastResult, action] = useFormState(authenticate, undefined);
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div>
        <label>Email</label>
        <input
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue as string}
        />
        <div>{fields.email.errors}</div>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue as string}
        />
        <div>{fields.password.errors}</div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};