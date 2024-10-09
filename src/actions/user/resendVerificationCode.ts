"use server";
import UserModel from "@/models/user.model";
import dbConnect from "@/config/dbConnect";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";


export const resendVerificationCode = async (email: string) => {
  try {
    // Connect to the database
    await dbConnect();

    // Check if a user exists with the provided email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "No account found with this email. \nPlease register your email.",
      };
    }

    // Check if the account is already verified
    if (user.isVerified) {
      return {
        success: false,
        message: "Account is already verified. \nPlease login with credentails",
      };
    }

    // Generate a new verification code and expiry date 
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // 1-hour expiry

    // Update the user with the new verification code and expiry
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = expiryDate;
    await user.save();

    // Convert user ID to string
    const userId = String(user._id);

    // Resend verification email
    const emailResponse = await sendVerificationEmail(user.name, user.email, verifyCode, userId);

    // Check if email sending was successful
    if (!emailResponse.success) {
      return {
        success: false,
        message: emailResponse.message,
      };
    }

    return {
      success: true,
      message: "Verification code email resent.",
    };
  } catch (error) {
    console.error("Error resending verification email:", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
