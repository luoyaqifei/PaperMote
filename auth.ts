import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./app/lib/data";
import { verifyPassword } from "./app/lib/utils";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        const { email, password } = credentials;
        const user = await getUser(email as string);
        if (!user) {
          throw new Error("No user found with that email");
        }
        const passwordHash = user.password;
        const isPasswordValid = verifyPassword(password as string, passwordHash);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        console.log("Logged-in user", user);
        return user;
      },
    }),
  ],
});