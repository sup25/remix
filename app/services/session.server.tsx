import { createCookieSessionStorage } from "@remix-run/node";

// Update the cookie settings for your domain and production environment
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax", // helps with CSRF
    path: "/", // cookie applies to all routes
    httpOnly: true, // prevents JS from accessing the cookie
    secrets: ["s3cr3t"], // replace with an actual secret
    secure: process.env.NODE_ENV === "production", // ensure cookies are secure in production
    domain:
      process.env.NODE_ENV === "production"
        ? ".remixstore.duckdns.org"
        : "localhost", // set the domain (use the full domain for your production site)
  },
});

// Export session management functions
export let { getSession, commitSession, destroySession } = sessionStorage;
