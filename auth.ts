// import NextAuth from "next-auth";
// // import GitHub from "next-auth/providers/github";
// import authConfig from "@/auth.config";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/lib/db";
// import { getUserById } from "@/data/user";
// import { UserRole } from "@prisma/client";


// export const {
//     handlers : { GET, POST },
//     auth,
//     signIn,
//     signOut
// } = NextAuth({
//     // providers: [GitHub],
//     pages: {
//         signIn: "/auth/login",
//         error: "/auth/error"
//     },
//     events: {
//         async linkAccount({ user }) {
//             await db.user.update({
//                 where: { id: user.id },
//                 data: { emailVerified: new Date() }
//             })
//         },
//     },
//     callbacks: {
//         // async signIn({ user }) {
//         //     const existingUser = await getUserById(user.id);

//         //     if(!existingUser || !existingUser.emailVerified) {
//         //         return false
//         //     }

            
//         //     return true
//         // },
//         async signIn({ user , account }) {
//             if(account?.provider !== 'credentials'){
//                 return true
//             }

//             if (!user?.id) {
//                 return false
//             }

//             // check type error
//             const existingUser = await getUserById(user.id);

//             if(!existingUser?.emailVerified) return false

//             return true
//         },
//         async session({ token, session}) {
//             if (token.sub && session.user) {
//                 session.user.id = token.sub
//             }
//             if (token.role && session.user) {
//                 session.user.role = token.role as UserRole
//             }
//             return session
//         },

//         async jwt({ token, user }) {

//             if(!token.sub) return token;

//             const existingUser = await getUserById(token.sub)

//             if(!existingUser) return token;

//             token.role  = existingUser.role

//             console.log("NEW")
//             console.log({token, user})

//             return token
//         },
//     },
//     adapter: PrismaAdapter(db),
//     session: { strategy: "jwt"},
//     ...authConfig
// })



import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // providers: [GitHub],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user?.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken;
      }
      console.log({session, token})
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.accessToken; // Assuming accessToken comes from account on initial sign in
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      console.log({ token, user });

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
