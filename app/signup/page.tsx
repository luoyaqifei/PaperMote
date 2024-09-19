import LoginOrSignupForm from "@/app/ui/loginOrSignup/login-signup-form";
import { Card } from "@nextui-org/react";

export default function Signup() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-8 mx-auto bg-teal-50">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-teal-600 text-center">Sign Up</h1>
        <LoginOrSignupForm isLogin={false} />
      </Card>
    </div>
  )
}