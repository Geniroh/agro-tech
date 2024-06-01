// import { UserRole } from "@prisma/client";
// import NextAuth, { type DefaultSession} from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//     role: UserRole
// }

// declare module "next-auth" {
//     interface Session {
//         user: ExtendedUser
//     }
// }

// next-auth.d.ts
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    id: string;
    accessToken: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }

    interface User extends DefaultUser {
        role: UserRole;
        id: string;
        accessToken: string;
    }
}

