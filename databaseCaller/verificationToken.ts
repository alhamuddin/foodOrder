import { prisma } from "@/lib/prisma";

export const getVerificationTokenByEmail = async (identifier: string) => {
  try {
    const verificationEmail = await prisma.verificationToken.findFirst({
      where: {
        identifier,
      },
    });
    return verificationEmail;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
