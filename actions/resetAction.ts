"use server";
import { ResetSchema } from "@/app/(admin)/schemas";
import { getUserByEmail } from "@/databaseCaller/userRelated";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFiled = ResetSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFiled.data;

  const existingUser = await getUserByEmail(email); //here we are stopping non email verified user

  if (!existingUser || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "A email for resetting password has been sent!" };
};
