import LoginOrSignupForm from "@/app/ui/user/login-signup-form";
import { Card } from "@nextui-org/react";
import { headline } from "../ui/style-variants/headline";
import { backgroundColor } from "../ui/style-variants/variables";

export default function Login() {
  return (
    <div className={`container flex flex-col items-center justify-center min-h-screen py-8 mx-auto ${backgroundColor.primary}`}>
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className={headline({size: "3xl", color: "primary"})}>Login</h1>
        <LoginOrSignupForm isLogin={true} />
      </Card>
    </div>
  )
}