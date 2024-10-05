"use server";
import { haikuFormSchema } from "@/types/types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HaikuModel from "@/models/haiku.model"; // Import your Haiku model
import dbConnect from "@/config/dbConnect";
import { verifySignature } from "@/lib/verifySignature";

const JWT_SECRET = process.env.JWT_SECRET!;

export const createHaiku = async (formData: FormData) => {
    try {
        

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


        const { line1, line2, line3, signature, publicId,version } = parsedData.data;

        let result;
        if(signature && publicId && version){
             result = await verifySignature(version, signature, publicId)
        }

        await dbConnect();

        // Create a new Haiku document with the user reference
        const newHaiku = new HaikuModel({
            line1,
            line2,
            line3,
            photoId: result ? publicId :"",
            user: decodedToken.userId, // Reference the user ID from the token
        });

        // Save the haiku to the database
        await newHaiku.save();

        return {
            success: true,
            message: "Haiku created successfully.",
        };
    } catch (error) {
        console.error("Error creating haiku:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
