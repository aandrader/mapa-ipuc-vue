import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthAdmin, getAuthTemple } from "~/server/queries";

export default NuxtAuthHandler({
  secret: "secret",
  // your authentication configuration here!
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.type = user.type;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.type = token.type;
      return session;
    },
  },
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: "Credentials",
      authorize: async (credentials: any) => {
        try {
          if (credentials.selectedTemple === "admin") {
            const admin = await getAuthAdmin(credentials.selectedDistrict as string);

            if (!admin) return null;

            if (credentials.password !== admin.password) return null;

            return { id: admin.distrito, type: "admin" };
          } else {
            const templeUser = await getAuthTemple(credentials.selectedTemple as string);

            if (!templeUser) return null;
            if (credentials.password !== templeUser.password) return null;

            return { id: templeUser.id, type: "temple" } as any;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
});
