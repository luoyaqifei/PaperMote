import LoginOrSignupForm from "@/app/ui/components/login-signup-form";
import { Card } from "@nextui-org/react";
import { headline } from "@/app/ui/style-variants/headline";
import BackgroundImage from "@/app/ui/components/background-image";
import { backgroundColor } from "@/app/ui/style-variants/variables";

export default function Login() {
  return (
    <div className={`container flex flex-col items-center justify-center min-h-screen mx-auto`}>
      <BackgroundImage />
      <Card className={`w-full p-8 bg-white rounded-lg shadow-lg ${backgroundColor.primary} opacity-90`}>
        <h1 className={headline({size: "3xl", color: "primary"})}>Login</h1>
        <LoginOrSignupForm isLogin={true} />
      </Card>
    </div>
  )
}