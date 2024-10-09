
import { transporter } from "@/config/nodemailer";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import { render } from "@react-email/components";
const AUTH_EMAIL = process.env.MAIL_AUTH_EMAIL;


export async function sendPasswordResetEmail(
  name: string,
  email: string,
  verifyCode: string,
  
) {
  try {

    const emailHtml = await render(PasswordResetEmail({ name, resetCode: verifyCode}));
    
    const options = {
      from: `"${name}" <${AUTH_EMAIL}>`,
      to: email,
      subject: "Password Reset Verification Code",
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

