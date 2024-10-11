"use server";
import { haikuFormSchema } from "@/types/types"; // Your schema for validation
import HaikuModel from "@/models/haiku.model"; 
import dbConnect from "@/config/dbConnect"; 
import { verifySignature } from "@/lib/verifySignature";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/authUtils";


export const updateHaiku = async (formData: FormData, id: string) => {
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

        const { signature, publicId, version } = parsedData.data;
       
        // Fetch the existing haiku to get the current photoId
        const existingHaiku = await HaikuModel.findOne({ _id: id, user: userId });
        if (!existingHaiku) {
            return {
                success: false,
                message: "Haiku not found!.",
            };
        }

        let photoId = existingHaiku.photoId; // Use the existing photoId as the default
    
        // Verify the signature only if all parameters are present
        if (signature && publicId && version) {
            const result = await verifySignature(version, signature, publicId);
            if (result) {
                photoId = publicId; // Use publicId if verification is successful
            }
        }
           // Prepare update data, including photoId if verified
        const updateData = {
            ...parsedData.data,
            photoId, // Include photoId in the update
        };

        // Connect to the database after token validation
        await dbConnect();

        // Update the haiku in the database ensuring the user owns the haiku
        const updatedHaiku = await HaikuModel.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true }
        );

        // Check if the haiku was found and updated
        if (!updatedHaiku) {
            return {
                success: false,
                message: "Haiku not found!",
            };
        }
        revalidatePath("/dashboard");
        return {
            success: true,
            message: "Haiku updated successfully.",
        };
    } catch (error) {
        console.error("Error updating haiku:", error);
        return {
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
