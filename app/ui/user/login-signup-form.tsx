"use client";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { authenticate, signup } from "@/app/lib/actions";
import { LoginSchema, SignupSchema } from "@/app/lib/schema";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useToast } from "@/app/lib/hooks";
import { button } from "../style-variants/button";
import { input } from "../style-variants/input";

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
          classNames={{
            input: input().input(),
            label: input().label(),
            inputWrapper: input().inputWrapper()
          }}
          label="Email"
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue as string}
          isInvalid={!!fields.email.errors}
          errorMessage={fields.email.errors}
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
            input: input().input(),
            label: input().label(),
            inputWrapper: input().inputWrapper()
          }}
        />
        <Button type="submit" className={button({color: "primary"})}>
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
          ? <Link href="/signup" className={`${button({color: "primary", flat: true})} hover:underline`}>
              No account? <span className="underline">Sign up</span>
            </Link> 
          : <Link href="/login" className={`${button({color: "primary", flat: true})} hover:underline`}>
              Already have an account? <span className="underline">Log in</span>
            </Link>
        }
      </div>
    </>
  );
}
