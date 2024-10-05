"use server";
import dbConnect from "@/config/db-connect";
import UserModel from "@/models/user.model";
import { registerFormSchema } from "@/types/types";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!";

export const registerUser = async (formData: FormData) => {
    try {
        const data = Object.fromEntries(formData.entries());
        const parsedData = registerFormSchema.safeParse(data);

        // Check for validation errors
        if (!parsedData.success) {
            console.log("Validation errors:", parsedData.error.format());
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }
        await dbConnect();

        const { name, email, password } = parsedData.data;

        // Check if user already exists
        const existingUserByEmail = await UserModel.findOne({ email });
        if (existingUserByEmail) {
            return {
                success: false,
                message: "User already exists with the given email.",
            };
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user
        await newUser.save();

        // Handle case where user was not found after registration
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {
                success: false,
                message: "User registration failed. Please try again.",
            };
        }
        
        
        // Fetch the user to create a JWT

        const tokenValue = jwt.sign(
            {
                name: user.name,
                userId: user._id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, 
                // Token will expire in 24 hours
            },
            JWT_SECRET,
        );

        // Set the cookie with the JWT
        cookies().set("mynexthaiku", tokenValue, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production", // Use secure in production
        });
        return {
            success: true,
            message: "User registration successful.",
        };

       
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            success: false,
            message: "An unexpected error occurred during registration.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
