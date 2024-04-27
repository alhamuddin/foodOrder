"use server";
import { RegisterSchema } from "@/app/(admin)/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/databaseCaller/userRelated";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiled = RegisterSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid inputs" };
  }
  const { password, email, name } = validatedFiled.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already registered, try using forget password" };
  }
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email); //this will generate verification token

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  );
  return { success: "Verification mail sent to provided email" };
};
