import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: "mysupersecretkey123456789abcdefgh",
  baseURL: "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});