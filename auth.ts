import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, getUserById } from "./app/lib/data";
import { verifyPassword } from "./app/lib/utils";
import { authConfig } from "./auth.config";
import { User } from "./app/lib/definitions";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);
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
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) return session;
      const user: User | null = await getUserById(token.sub);
      if (!user) {
        throw new Error("User not found");
      }
      session.user = {...session.user, ...user};
      return session;
    },
  },
});