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
  "/auth/new-password",
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

// /**
//  * An array of routes that are accessible to the public
//  * @type {string[]}
//  */
// export const publicRoutes = [
//   "/",
//   "/auth/new-verification",
//   "/tester",
//   "/api/v1",
//   "/api/v1/upload",
//   "/api/v1/innovation",
//   "/api/v1/innovation/:id",
// ];

// /**
//  * An array of routes that require authentication
//  * @type {string[]}
//  */
// export const authRoutes = [
//   "/auth/login",
//   "/auth/login/signin",
//   "/auth/register",
//   "/auth/error",
//   "/auth/reset",
//   "/auth/new-password",
// ];

// export const protectedRoutes = ["/discussion", "/analytics"];

// /**
//  * Prefix for api authentication routes
//  * @type {string}
//  */
// export const apiAuthPrefix = "/api/auth";

// /**
//  * default redirect path after login
//  * @type {string}
//  */
// export const DEFAULT_LOGIN_REDIRECT = "/";

// /**
//  * Check if a given path matches any public route pattern
//  * @param path - The path to check
//  * @returns {boolean} - True if the path matches a public route pattern
//  */
// export const isPublicRoute = (path: string): boolean => {
//   const dynamicRoutePattern = new RegExp("^/api/v1/innovation/[^/]+$");

//   return publicRoutes.some((route) => {
//     if (route.includes(":")) {
//       return dynamicRoutePattern.test(path);
//     }
//     return route === path;
//   });
// };
