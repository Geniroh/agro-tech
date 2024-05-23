/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 */


export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/tester"
]

/**
 * An array of routes that require authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/login/signin",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

export const protectedRoutes = [
    "/discussion",
    "/analytics",
]


/**
 * Prefix for api authentication routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"