/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/privacy-policy",
  "/auth/new-verification",
  "/api/v1",
  "/api/v1/upload",
  "/api/v1/featured",
  "/api/v1/innovation",
  "/api/v1/innovation/:id",
  "/edit/:id",
];

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
  /^\/edit\/[^\/]+$/,
];

export const protectedRoutes = ["/discussion", "/analytics"];

/**
 * Prefix for api authentication routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
