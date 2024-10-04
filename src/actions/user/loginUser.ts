"use server"; // This indicates that the function will run on the server side

import UserModel from "@/models/user.model"; // Import the User model
import { loginFormSchema } from "@/types/types";
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For creating JWTs
import { cookies } from "next/headers"; // To manage cookies

const JWT_SECRET = process.env.JWT_SECRET!

export const loginUser = async (formData: FormData) => {

    try {
        const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
        const parsedData = loginFormSchema.safeParse(data);

         // Check for validation errors
         if (!parsedData.success) {
            // console.log("Validation errors:", parsedData.error.format());
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }

        const { email, password } = parsedData.data;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return {
                success: false,
                message: "User not found.",
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
            message: "An unexpected error occurred during login.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
