// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
// import Facebook from "next-auth/providers/facebook"
// import credentials from "next-auth/providers/credentials"
// import { LoginSchema } from "@/schemas"
// import type { NextAuthConfig } from "next-auth"
// import { getUserByEmail } from "@/data/user"
// import bcrypt from 'bcryptjs'

// export default {
//     providers: [
//         GitHub({
//             clientId: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET
//         }),
//         Google({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         }),
//         Facebook({
//             clientId: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//         }),
//         credentials({
//             async authorize(credentials) {
//                 const validatedField = LoginSchema.safeParse(credentials)

//                 if(validatedField.success) {
//                     const { email, password } = validatedField.data

//                     const user = await getUserByEmail(email);
//                     if(!user || !user.password) return null

//                     const passwordMatch = await bcrypt.compare(password, user.password)

//                     if(passwordMatch) return user
                    
//                     return null
//                 }
//             }
//         })
//     ],
// } satisfies NextAuthConfig

// // import GitHub from "next-auth/providers/github";
// // import Google from "next-auth/providers/google";
// // import Facebook from "next-auth/providers/facebook";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { LoginSchema } from "@/schemas";
// // import NextAuthOptions from "next-auth"
// // import { getUserByEmail } from "@/data/user";
// // import bcrypt from 'bcryptjs';

// // export const authOptions: NextAuthOptions = {
// //     providers: [
// //         GitHub({
// //             clientId: process.env.GITHUB_CLIENT_ID,
// //             clientSecret: process.env.GITHUB_CLIENT_SECRET,
// //         }),
// //         Google({
// //             clientId: process.env.GOOGLE_CLIENT_ID,
// //             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //         }),
// //         Facebook({
// //             clientId: process.env.FACEBOOK_CLIENT_ID,
// //             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
// //         }),
// //         CredentialsProvider({
// //             name: 'Credentials',
// //             credentials: {
// //                 email: { label: "Email", type: "email" },
// //                 password: { label: "Password", type: "password" },
// //             },
// //             async authorize(credentials) {
// //                 if (!credentials) {
// //                     return null;
// //                 }

// //                 const validatedField = LoginSchema.safeParse(credentials);

// //                 if (validatedField.success) {
// //                     const { email, password } = validatedField.data;

// //                     const user = await getUserByEmail(email);
// //                     if (!user || !user.password) return null;

// //                     const passwordMatch = await bcrypt.compare(password, user.password);

// //                     if (passwordMatch) return user;

// //                     return null;
// //                 }
// //                 return null;
// //             },
// //         }),
// //     ],
// // };

// // export default authOptions;

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from 'bcryptjs';
import { UserRole } from "@prisma/client"; // Assuming this is where UserRole is defined

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const validatedField = LoginSchema.safeParse(credentials);

                if (validatedField.success) {
                    const { email, password } = validatedField.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        // Ensure the user object conforms to the expected User type
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            emailVerified: user?.emailVerified,
                            image: user?.image,
                            password: user?.password,
                            role: user.role as UserRole, // Assuming role is part of your User model
                        };
                    }

                    return null;
                }

                return null;
            }
        })
    ],
    trustHost: true,
    secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;

