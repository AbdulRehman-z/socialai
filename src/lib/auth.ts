import { db, schema } from "@/db";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { resend, sendEmailOTP, sendVerificationMail } from "./mail";
import OTPEmail from "@/components/custom/emails/otpEmail";
import EmailVerificationMail from "@/components/custom/emails/emailVerificationMail";
import { config } from "./config";

export const auth = betterAuth({
  appName: "Socialai",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
  verification: {
    disableCleanup: false
  },
  account: {
    accountLinking: {
      trustedProviders: ["facebook", "google"],
      enabled: true
    },
  },
  socialProviders: {
    google: {
      clientId: config.env.GOOGLE_CLIENT_ID,
      clientSecret: config.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      enabled: true,
      redirectURI: "http://localhost:3000/api/auth/callback/facebook",
      clientId: config.env.FACEBOOK_CLIENT_ID,
      clientSecret: config.env.FACEBOOK_CLIENT_SECRET,
    },
  },
  emailVerification: {
    autoSignInAfterVerification: false,
    expiresIn: 60 * 60, // 60 minutes
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user, token }) => {
      const addressUrl = new URL(url)
      addressUrl.searchParams.set("callbackURL", "/verify")
      const res = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: "Verify your email",
        react: EmailVerificationMail({ userEmail: user.email, verificationUrl: addressUrl.toString() }),
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,

  },
  plugins: [
    emailOTP({
      expiresIn: 10 * 60,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
          from: 'Socialai <onboarding@resend.dev>',
          to: email,
          subject: "Reset Password OTP",
          react: OTPEmail({ email, otpCode: otp }),
        });
      },

    })
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds which equals 5 minutes
    },
  },
});
