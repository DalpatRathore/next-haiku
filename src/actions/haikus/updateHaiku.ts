"use server";
import { haikuFormSchema } from "@/types/types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HaikuModel from "@/models/haiku.model"; // Import your Haiku model
import dbConnect from "@/config/db-connect";

const JWT_SECRET = process.env.JWT_SECRET!;
export const updateHaiku = async (formData: FormData, id: string) => {
    try {

        await dbConnect();
        
        const cookieStore = cookies();
        const token = cookieStore.get("mynexthaiku")?.value;

        // Check if the token exists
        if (!token) {
            return {
                success: false,
                message: "Unauthorized user",
            };
        }

        // Verify the token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Check the decoded token type and userId presence
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
                errors: parsedData.error.errors, // Provide validation error details
            };
        }

        const updateData = parsedData.data;
     
        // Update the haiku in the database ensuring the user owns the haiku
        const updatedHaiku = await HaikuModel.findOneAndUpdate(
            { _id: id, user: decodedToken.userId }, // Check both _id and userId
            updateData,
            { new: true }
        );

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
