"use server";
import { LoginSchema } from "@/app/(admin)/schemas";
import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/databaseCaller/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/databaseCaller/two-factor-token";
import { getUserByEmail } from "@/databaseCaller/userRelated";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFiled = LoginSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid inputs" };
  }

  const { email, password, code } = validatedFiled.data;

  const existingUser = await getUserByEmail(email); //here we are stopping non email verified user

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      //creating verification token
      existingUser.email
    );
    await sendVerificationEmail(
      //This will send a verification link to user whos email is not verified!
      verificationToken.identifier,
      verificationToken.token
    );
    return { success: "New Verification email has been sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //2FA
      const towFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!towFactorToken) {
        return { error: "Invalid two factor code!" };
      }
      if (towFactorToken.token !== code) {
        return { error: "Invalid two factor code!" };
      }
      const hasExpired = new Date(towFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: " The code has been expired" };
      }
      await prisma.twoFactorToken.delete({
        where: { id: towFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const towFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(towFactorToken.email, towFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default: {
          return { error: "Something went wrong" };
        }
      }
    }
    throw error;
  }
  return { success: "Email sent" };
};
