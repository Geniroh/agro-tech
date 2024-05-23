var nodemailer = require("nodemailer");

export async function sendMail(subject: string, toEmail: string, otpText: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}


export const sendVerificationEmail = async (
    email: string, token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await sendMail("Confirm your email", email, `<p>Click <a href="${confirmLink}">here</a> to confirm email. </p>`)
}


export const sendPasswordResetEmail = async (
  email: string, token: string
) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

   await sendMail("Reset your password", email, `<p>Click <a href="${resetLink}">here</a> to reset password. </p>`)
}


