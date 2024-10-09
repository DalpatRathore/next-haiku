"use server";
import dbConnect from "@/config/dbConnect";

import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import UserModel from "@/models/user.model";
import { registerFormSchema } from "@/types/types";
import bcrypt from 'bcryptjs';


export const registerUser = async (formData: FormData) => {
    try {
        // Parse and validate form data
        const data = Object.fromEntries(formData.entries());
        const parsedData = registerFormSchema.safeParse(data);

        if (!parsedData.success) {
            // Return validation errors
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.format(),
            };
        }

        const { name, email, password } = parsedData.data;

        // Establish database connection only after validation
        await dbConnect();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return {
                success: false,
                message: "User already exists with the email. \Please login with email & password",
            };
        }

        // Generate verification code and expiry date
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);  // 1-hour expiry

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
        });
 

        await newUser.save();

        // Convert user ID to string
        const userId = String(newUser._id);

        // Send verification email
        const emailResponse = await sendVerificationEmail( name, email,verifyCode,userId);

        // Check if email sending was successful
        if (!emailResponse.success) {
            return {
                success: false,
                message: emailResponse.message,
            };
        }
         // Return success with user ID
         return {
            success: true,
            message: "User registration successful. \nPlease verify email.",
            userId
        };

       

    } catch (error) {
        // Error handling with consistent structure
        console.error("Error registering user:", error);
        return {
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
