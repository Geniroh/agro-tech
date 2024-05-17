import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "@/data/user"
import bcrypt from 'bcryptjs'

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        credentials({
            async authorize(credentials) {
                const validatedField = LoginSchema.safeParse(credentials)

                if(validatedField.success) {
                    const { email, password } = validatedField.data

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user
                    
                    return null
                }
            }
        })
    ],
} satisfies NextAuthConfig