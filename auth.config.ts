import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/signup",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn", isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log("isOnDashboard", isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
