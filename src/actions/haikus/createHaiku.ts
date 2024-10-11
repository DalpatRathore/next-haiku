"use server";
import { haikuFormSchema } from "@/types/types";
import HaikuModel from "@/models/haiku.model"; // Import your Haiku model
import dbConnect from "@/config/dbConnect";
import { verifySignature } from "@/lib/verifySignature";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/authUtils"; // Import your verifyToken utility

export const createHaiku = async (formData: FormData) => {
    try {
        // Verify the token using the utility function
        const userId = verifyToken();

        // Check if the userId was returned, meaning the token was valid
        if (!userId) {
            return {
                success: false,
                message: "Unauthorized user account",
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

        const { line1, line2, line3, signature, publicId, version } = parsedData.data;

        let result;
        if (signature && publicId && version) {
            result = await verifySignature(version, signature, publicId);
        }

        await dbConnect();

        // Create a new Haiku document with the user reference
        const newHaiku = new HaikuModel({
            line1,
            line2,
            line3,
            photoId: result ? publicId : "",
            user: userId, // Use the verified userId directly
        });

        await newHaiku.save();
        revalidatePath("/dashboard");
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
