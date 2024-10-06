"use server";
import UserModel from "@/models/user.model";
import dbConnect from "@/config/dbConnect";
import { sendPasswordResetEmail } from "@/lib/sendPasswordResetEmail";

export const sendPasswordResetCode = async (email: string) => {
  try {
    // Connect to the database
    await dbConnect();

    // Check if a user exists with the provided email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    // Check if the account is verified
    if (!user.isVerified) {
      return {
        success: false,
        message: "Account is not verified. Please verify your account first.",
      };
    }

    // Generate a new reset code and expiry date
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // 1-hour expiry

    user.verifyCode = resetCode;
    user.verifyCodeExpiry = expiryDate;
    await user.save();

    
    const emailResponse = await sendPasswordResetEmail(user.name, user.email, resetCode);

    // Check if email sending was successful
    if (!emailResponse.success) {
      return {
        success: false,
        message: emailResponse.message,
      };
    }

    return {
      success: true,
      message: "Password reset code has been sent to your email.",
    };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return {
      success: false,
      message: "An error occurred while sending the password reset email.",
    };
  }
};
