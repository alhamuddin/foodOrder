"use server";

import { getUserByEmail } from "@/databaseCaller/userRelated";
import { getVerificationTokenByToken } from "@/databaseCaller/verificationToken";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { date } from "zod";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token doesn't exist or Invalid " };
  }
  const hasTokenExpired = new Date(existingToken.expires) < new Date();

  if (hasTokenExpired) {
    return { error: "Verification tokrn has been expired!" };
  }
  const existingUser = await getUserByEmail(existingToken.identifier);
  if (!existingUser) {
    return { error: "Email doesn't exist!" };
  }
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
    },
  });
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Email verified!" };
};
