"use server";
import { haikuFormSchema } from "@/types/types"; // Your schema for validation
import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import HaikuModel from "@/models/haiku.model"; 
import dbConnect from "@/config/db-connect"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const updateHaiku = async (formData: FormData, id: string) => {
    try {
        // Retrieve cookies
        const cookieStore = cookies();
        const token = cookieStore.get("mynexthaiku")?.value;

        // Check if the token exists
        if (!token) {
            return {
                success: false,
                message: "Unauthorized user",
            };
        }

        // Verify the JWT token and decode it
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Validate the decoded token
        if (typeof decodedToken === "string" || !decodedToken.userId) {
            return {
                success: false,
                message: "Invalid token.",
            };
        }

        // Parse the form data
        const data = Object.fromEntries(formData.entries());
        const parsedData = haikuFormSchema.safeParse(data);

        // Check for validation errors
        if (!parsedData.success) {
            return {
                success: false,
                message: "Validation errors occurred.",
                errors: parsedData.error.errors,
            };
        }

        const updateData = parsedData.data;

        // Connect to the database after token validation
        await dbConnect();

        // Update the haiku in the database ensuring the user owns the haiku
        const updatedHaiku = await HaikuModel.findOneAndUpdate(
            { _id: id, user: decodedToken.userId },
            updateData,
            { new: true }
        );

        // Check if the haiku was found and updated
        if (!updatedHaiku) {
            return {
                success: false,
                message: "Haiku not found or you're not authorized to update it.",
            };
        }

        return {
            success: true,
            message: "Haiku updated successfully.",
        };
    } catch (error) {
        console.error("Error updating haiku:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
