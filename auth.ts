import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        return {
          firstName: "Dima",
          lastName: "MyLastName",
          email: "my@email.com",
          role: "dev",
          id: "myId",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("---------SignIn callback:", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(
        "-------Redirect callback:",
        process.env.GITHUB_CLIENT_ID,
        process.env.GITHUB_CLIENT_SECRET
      );
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("-----------Session callback:", { session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("----------JWT callback:", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      return token;
    },
  },
});
