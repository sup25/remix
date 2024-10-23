import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import prisma from "~/_lib/db";
import { sessionStorage } from "./session.server";

let authenticator = new Authenticator(sessionStorage, {
  sessionKey: "user",
  sessionErrorKey: "error",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Invalid email or password");
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return { id: user.id, email: user.email, name: user.name };
  })
);

export { authenticator };
