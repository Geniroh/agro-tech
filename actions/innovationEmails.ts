"use server";
import { auth } from "@/auth";
import { sendUploadAlert, sendUploadRequest, sendEditEmail } from "@/lib/mail";

export const sendUploadSucess = async (email: string) => {
  const session = await auth();

  sendUploadRequest(email, session?.user.name || "");
  sendUploadAlert(
    process.env.NODEMAILER_EMAIL || "irochibuzor@gmail.com",
    session?.user.name || ""
  );
};

export const sendEditRequest = async (
  email: string,
  title: string,
  message: string
) => {
  try {
    sendEditEmail(email, title, message);
  } catch (error) {
    return { error: "Message failed to send" };
  }
};
