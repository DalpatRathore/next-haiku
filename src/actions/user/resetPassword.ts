"use server"; 

import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/user.model";
import { resetPasswordFormSchema } from "@/types/types";  // Import your Zod schema
import bcrypt from 'bcryptjs'; 
import { cookies } from "next/headers"; 
import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const resetPassword = async (formData: FormData) => {
    try {
        // Convert FormData to a plain object
        const data = Object.fromEntries(formData.entries());
        const parsedData = resetPasswordFormSchema.safeParse(data);

        // Check for validation errors
        if (!parsedData.success) {
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }

        await dbConnect();
        const { email, pin, newPassword } = parsedData.data;

        // Find the user by email
        const user = await UserModel.findOne({ email }); 

        // Check if the user exists
        if (!user) {
            return {
                success: false,
                message: "Invalid email or Verification code.",
            };
        }

        // Check if the verification code matches
        if (user.verifyCode !== pin) {
            return {
                success: false,
                message: "Invalid password reset verification code. \nPlease use correct code from email.",
            };
        }

        // Check if the verification code has expired
        const currentTime = new Date();
        if (currentTime > user.verifyCodeExpiry) {
            return {
                success: false,
                message: "Verification code has expired. \nPlease request a new verification code.",
            };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust salt rounds as needed

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Optionally, create a new token if needed
        const tokenValue = jwt.sign(
            {
                name: user.name,
                userId: user._id,
                exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24), // Token expires in 24 hours
            },
            JWT_SECRET,
        );

        // Set the cookie with the JWT
        cookies().set("mynexthaiku", tokenValue, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            secure: true,
        });

        return {
            success: true,
            message: "Password reset successful.",
        };

    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            success: false,
            message: "Something went wrong.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
