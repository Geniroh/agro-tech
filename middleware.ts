// import authConfig from "@/auth.config"
// import NextAuth from "next-auth"
// import {
//     DEFAULT_LOGIN_REDIRECT,
//     apiAuthPrefix,
//     authRoutes,
//     publicRoutes,
//     protectedRoutes
// } from "@/routes"

// const { auth } = NextAuth(authConfig)

// export default auth((req) => {
//     const { nextUrl } = req;
//     const isLoggedIn = !!req.auth


//     const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname)
//     const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)

//     if(isAPiAuthRoute) {
//         return null
//     }

//     if(isAuthRoute) {
//         if(!isLoggedIn) {
//             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//         }
//         return null
//     }

//     if(!isLoggedIn && !isPublicRoute) {
//         return Response.redirect(new URL("/auth/login", nextUrl))
//     }

//     return null;
// })

// export const config = {
//     // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
//     // matcher: ["/auth/login"]
// }

import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    protectedRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return; // returning void
    }

    if (isAuthRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return; // returning void
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return; // returning void
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
