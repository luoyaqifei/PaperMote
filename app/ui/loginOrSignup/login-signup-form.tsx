"use client";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { authenticate, signup } from "@/app/lib/actions";
import { LoginSchema, SignupSchema } from "@/app/lib/schema";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function LoginOrSignupForm({isLogin}: {isLogin: boolean}) {
  const [lastResult, action] = useFormState(isLogin ? authenticate : signup, undefined);
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: isLogin ? LoginSchema : SignupSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <Input
        label="Email"
        type="email"
        key={fields.email.key}
        name={fields.email.name}
        defaultValue={fields.email.initialValue as string}
      />
      <div>{fields.email.errors}</div>
      <Input
        label="Password"
        type="password"
        key={fields.password.key}
        name={fields.password.name}
        defaultValue={fields.password.initialValue as string}
      />
      <div>{fields.password.errors}</div>
      <Button type="submit">{isLogin ? "Login" : "Sign up"}</Button>
      <div>{form.errors}</div>
      {lastResult && 'message' in lastResult && (
        <div className="text-red-500 mt-2">{lastResult.message}</div>
      )}
    </form>
        {isLogin 
        ? <Link href="/signup">Don't have an account? Sign up</Link> 
        : <Link href="/login">Already have an account? Login</Link>}
    </>
  );
}
