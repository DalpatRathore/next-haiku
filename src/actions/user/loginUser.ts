"use server"; 

import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/user.model";
import { loginFormSchema } from "@/types/types";
import bcrypt from 'bcryptjs'; 
import { createToken, setToken } from "@/lib/authUtils"; 

export const loginUser = async (formData: FormData) => {
    try {
        const data = Object.fromEntries(formData.entries()); 
        const parsedData = loginFormSchema.safeParse(data);

        if (!parsedData.success) {
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }

        await dbConnect();
        const { email, password } = parsedData.data;

        const user = await UserModel.findOne({ email }).lean();

        if (!user) {
            return {
                success: false,
                message: "Email account not found. \nPlease register first.",
            };
        }

        if (!user.isVerified) {
            return {
                success: false,
                message: "Email account not verified. \nPlease verify your email",
                userId: String(user._id)
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        const tokenValue = createToken(user._id.toString(), "24h"); // Specify expiration time
        setToken(tokenValue); // Use default maxAge (1 hour) or specify as needed

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
