"use server";
import { auth } from "@/auth";
import { sendUploadAlert, sendUploadRequest } from "@/lib/mail";

export const sendUploadSucess = async (email: string) => {
  const session = await auth();

  sendUploadRequest(email, session?.user.name || "");
  sendUploadAlert(
    process.env.NODEMAILER_EMAIL || "irochibuzor@gmail.com",
    session?.user.name || ""
  );
};
