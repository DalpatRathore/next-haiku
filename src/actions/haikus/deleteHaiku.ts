"use server";

import HaikuModel from "@/models/haiku.model"; 
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/authUtils";


export const deleteHaiku = async (haikuId: string) => {
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

        // Delete the haiku associated with the userId and haikuId
        const deletedHaiku = await HaikuModel.findOneAndDelete({
            _id: haikuId,
            user: userId,
        });

        if (!deletedHaiku) {
            return {
                success: false,
                message: "Haiku not found.",
            };
        }

        revalidatePath("/dashboard");

        return {
            success: true,
            message: "Haiku deleted successfully.",
        };
    } catch (error) {
        console.error("Error deleting haiku:", error);
        return {
            success: false,
            message: "Something went wrong!",
        };
    }
};
