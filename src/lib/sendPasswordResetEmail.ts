
import { Resend } from "resend";
import PasswordResetEmail from "@/emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  name: string,
  email: string,
  verifyCode: string,
  
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset Verification Code",
      react: PasswordResetEmail({ name, resetCode: verifyCode}),
    });
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
