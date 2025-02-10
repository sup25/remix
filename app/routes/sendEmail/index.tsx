import { ActionFunction, json } from "@remix-run/node";
import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate";
import prisma from "~/_lib/db"; // Import your Prisma instance
import { checkExistingOrder } from "~/.server/services/order";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const userEmail = formData.get("email");
    const userName = formData.get("username");
    const transactionUuid = formData.get("transactionUuid");

    if (!userEmail || typeof userEmail !== "string") {
      return json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!userName || typeof userName !== "string") {
      return json({ error: "Invalid username" }, { status: 400 });
    }
    if (!transactionUuid || typeof transactionUuid !== "string") {
      return json({ error: "Invalid transaction UUID" }, { status: 400 });
    }

    const existingOrder = await checkExistingOrder(transactionUuid);

    if (!existingOrder) {
      return json({ error: "Order not found" }, { status: 404 });
    }

    console.log(
      `Order found with UUID: ${transactionUuid}. Proceeding to send email.`
    );

    // Send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailContent = emailTemplate({ userEmail, userName });

    await transporter.sendMail({
      from: `"Remix" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: "Order Confirmation",
      html: emailContent,
    });

    console.log(
      `Email sent successfully to ${userEmail} for transaction ${transactionUuid}`
    );

    return json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return json({ error: "Failed to send email" }, { status: 500 });
  }
};
