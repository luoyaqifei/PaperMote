"use client";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { authenticate, signup } from "@/app/lib/actions";
import { LoginSchema, SignupSchema } from "@/app/lib/schema";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useToast } from "@/app/lib/hooks";

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
  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate className="space-y-4">
        <Input
          label="Email"
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue as string}
          isInvalid={!!fields.email.errors}
          errorMessage={fields.email.errors}
          classNames={{
            input: "bg-white",
            label: "text-teal-600"
          }}
        />
        <Input
          label="Password"
          type="password"
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue as string}
          isInvalid={!!fields.password.errors}
          errorMessage={fields.password.errors}
          classNames={{
            input: "bg-white",
            label: "text-teal-600"
          }}
        />
        <Button type="submit" color="primary" className="w-full bg-teal-600 hover:bg-teal-700">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
        {form.errors && (
          <div className="text-red-500 mt-2">{form.errors}</div>
        )}
        {lastResult && 'message' in lastResult && (
          <div className="text-red-500 mt-2">{lastResult.message}</div>
        )}
      </form>
      <div className="mt-4 text-center">
        {isLogin 
          ? <Link href="/signup" className="text-teal-600 hover:underline">
              Don't have an account? Sign up
            </Link> 
          : <Link href="/login" className="text-teal-600 hover:underline">
              Already have an account? Log in
            </Link>
        }
      </div>
    </>
  );
}
