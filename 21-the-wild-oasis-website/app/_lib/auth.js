import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // if we want to use our own database I think (and well read docs as usual)
    // CredentialProvider,
  ],
  callbacks: {
    // return boolean user authorizes/not authorizes (when user try to access route),
    authorized({ auth, request }) {
      return !!auth?.user;

      // basically this
      // return auth?.user ? true : false;
    },
    // callback that runs actually before sign up process happens
    // can think of it as of middleware after putting credentials but before logging in
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch (error) {
        return false;
      }
    },

    // session callback - runs after signIn callback and each time the session is checked out (calling auth function for instance)
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      // we can mutate a session object
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// exporting functions from NextAuth
export const {
  auth,
  signIn,
  signOut,
  // actually route handler functions
  handlers: { GET, POST },
} = NextAuth(authConfig);
