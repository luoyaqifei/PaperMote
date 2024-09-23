import LoginOrSignupForm from "@/app/ui/components/login-signup-form";
import { Card } from "@nextui-org/react";
import { headline } from "@/app/ui/style-variants/headline";
import { backgroundColor } from "@/app/ui/style-variants/variables";
import BackgroundImage from "@/app/ui/components/background-image";

export default function Signup() {
  return (
    <article
      className={`container flex flex-col items-center justify-center mx-auto`}
    >
      <BackgroundImage />
      <Card
        className={`w-full p-8 rounded-lg shadow-lg ${backgroundColor.primary} opacity-90`}
      >
        <h1 className={headline({ size: "3xl", color: "primary" })}>Sign Up</h1>
        <LoginOrSignupForm isLogin={false} />
      </Card>
    </article>
  );
}
