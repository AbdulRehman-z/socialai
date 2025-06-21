import { db, schema } from "@/db";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { resend, sendEmailOTP, sendVerificationMail } from "./mail";
import OTPEmail from "@/components/custom/emails/otpEmail";
import EmailVerificationMail from "@/components/custom/emails/emailVerificationMail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
  appName: "Socialai",
  emailVerification: {
    autoSignInAfterVerification: false,
    expiresIn: 5 * 60,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user, token }) => {
      const addressUrl = new URL(url)
      addressUrl.searchParams.set("callbackURL", "/verify")
      await resend.emails.send({
        from: 'Socialai <onboarding@resend.dev>',
        to: user.email,
        subject: "Verify your email",
        react: EmailVerificationMail({ userEmail: user.email, verificationUrl: addressUrl.toString() }),
      });

      // await sendVerificationMail(user.email, addressUrl)
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
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {

        // await sendEmailOTP(email, otp, "Reset Password")
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
