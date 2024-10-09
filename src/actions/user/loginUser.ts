"use server"; 

import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/user.model";
import { loginFormSchema } from "@/types/types";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import { cookies } from "next/headers"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const loginUser = async (formData: FormData) => {
    try {
        // Convert FormData to a plain object
        const data = Object.fromEntries(formData.entries()); 
        const parsedData = loginFormSchema.safeParse(data);

        // Check for validation errors
        if (!parsedData.success) {
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }

        await dbConnect();
        const { email, password } = parsedData.data;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return {
                success: false,
                message: "Email Account not found. \nPlease register first.",
            };
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return {
                success: false,
                message: "Please verify your email.",
                userId: String(user._id)
            };
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

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
            message: "Login successful.",
        };

    } catch (error) {
        console.error("Error logging in:", error);
        return {
            success: false,
            message: "Something went wrong.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
