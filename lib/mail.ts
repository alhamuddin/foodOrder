import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "FoodGuide <onboarding@resend.dev>",
    to: email,
    subject: "Two factor Authentiaction code",
    html: `<p>Your 2FA code is <h2> ${token} </h2> which will expires in 10 mins</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "FoodGuide <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password<",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/verification?token=${token}`;
  await resend.emails.send({
    from: "FoodGuide <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your account",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  });
};
