"use server";
import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/user.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyEmailCode = async (userId: string, code: string) => {
    try {
        // Connect to the database
        await dbConnect();

        // Find the user by userId and ensure they are not verified
        const user = await UserModel.findOne({ _id: userId, isVerified: false });
        if (!user) {
            return {
                success: false,
                message: "User not found or already verified.",
            };
        }

        console.log(user);

        // Check if the verification code matches
        if (user.verifyCode !== code) {
            return {
                success: false,
                message: "Invalid verification code.",
            };
        }

        // Check if the verification code has expired
        const currentTime = new Date();
        if (currentTime > user.verifyCodeExpiry) {
            return {
                success: false,
                message: "Code has expired. Please request a new code.",
            };
        }

        // Mark the user as verified
        user.isVerified = true;
        await user.save();

        // Create JWT token
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
            message: "Email verified successfully",
        };
    } catch (error) {
        console.error("Error verifying email code:", error);
        return {
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
