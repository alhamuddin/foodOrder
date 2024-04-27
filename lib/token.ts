import { getVerificationTokenByEmail } from "@/databaseCaller/verificationToken";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prisma";
import { getResetPasswordTokenByEmail } from "@/databaseCaller/reset-password-token";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/databaseCaller/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }
  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 5 * 1000);
  const existingResetToken = await getResetPasswordTokenByEmail(email);
  if (existingResetToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingResetToken.id },
    });
  }
  const passwordResetToken = prisma.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 5 * 1000);

  const existingVerificationToken = await getVerificationTokenByEmail(email);

  if (existingVerificationToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
  return verificationToken;
};
