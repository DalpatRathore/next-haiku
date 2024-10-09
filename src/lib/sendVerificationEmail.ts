
import { render } from "@react-email/components";
const AUTH_EMAIL = process.env.MAIL_AUTH_EMAIL;
import VerificationEmail from "@/emails/VerificationEmail";
import { transporter } from "@/config/nodemailer";

export async function sendVerificationEmail(
  name: string,
  email: string,
  verifyCode: string,
  userId:string,
) {
  try {

    const emailHtml = await render(VerificationEmail({ name, verificationCode: verifyCode ,userId}));
    
    const options = {
      from: `"${name}" <${AUTH_EMAIL}>`,
      to: email,
      subject: "Email Verification Code",
      html: emailHtml,
    };
    await transporter.sendMail(options);   
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

