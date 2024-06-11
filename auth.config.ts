import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig, User } from "next-auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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
            const accessToken = jwt.sign(
              {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              },
              JWT_SECRET,
              { expiresIn: "1h" }
            );

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              emailVerified: user.emailVerified,
              image: user.image,
              accessToken,
              role: user.role as UserRole,
            } as User;
          }

          return null;
        }

        return null;
      },
    }),
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
