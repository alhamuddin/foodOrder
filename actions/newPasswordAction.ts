"use server";
import { NewPasswordSchema } from "@/app/(admin)/schemas";
import { getResetPasswordTokenByToken } from "@/databaseCaller/reset-password-token";
import { getUserByEmail } from "@/databaseCaller/userRelated";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/token";
import bcryptjs from "bcryptjs";

import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFiled = NewPasswordSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid field item" };
  }

  const { password } = validatedFiled.data;

  const existingToken = await getResetPasswordTokenByToken(token); //here we are stopping non email verified user

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasTokenExpired = new Date(existingToken.expires) < new Date();

  if (hasTokenExpired) {
    return { error: "Password reset token has been expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User doesn't exist" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "New Password Updated" };
};
