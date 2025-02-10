import { Prisma } from "@prisma/client";
import prisma from "~/_lib/db";

export const registerUser = async (
  name: string,
  email: string,
  address: string,
  hashedPassword: string
) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        Array.isArray(error.meta?.target) &&
        error.meta?.target.includes("email")
      ) {
        throw new Error("Email already exists");
      }
    }
    throw new Error("Something went wrong, please try again");
  }
};
