import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";


export const {
    handlers : { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    // providers: [GitHub],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        },
    },
    callbacks: {
        // async signIn({ user }) {
        //     const existingUser = await getUserById(user.id);

        //     if(!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }

            
        //     return true
        // },
        async signIn({ user , account }) {
            console.log({ account })
            if(account?.provider !== 'credentials'){
                return true
            }

            // check type error
            const existingUser = await getUserById(user.id || "1");

            if(!existingUser?.emailVerified) return false

            return true
        },
        async session({ token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            return session
        },

        async jwt({ token}) {

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token;

            token.role  = existingUser.role


            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig
})