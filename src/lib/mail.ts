import { Resend } from 'resend';

export const resend = new Resend();


export const sendEmailOTP = async (email: string, otp: string, subject: string) => {
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: subject,
    html: `<h2>Here is your 6 digit OTP: ${otp}</h2>`,
  })
}

export const sendResetPasswordMail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: `Reset your password`,
    html: `<p>click <a href="${resetLink}">here</a> to verify email.</p>`,
  });
}


export const sendVerificationMail = async (email: string, addressUrl: URL) => {

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: `Confirm your email`,
    html: `<p>click <a href="${addressUrl}">here</a> to verify email.</p>`,
  });
}
