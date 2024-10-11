"use server";

import HaikuModel from "@/models/haiku.model"; 
import { verifyToken } from "@/lib/authUtils";


export const getHaiku = async (haikuId: string) => {
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

        // Fetch haiku associated with the haikuId and userId
        const haiku = await HaikuModel.findOne({ _id: haikuId, user: userId }).lean();

        if (!haiku) {
            return {
                success: false,
                message: "Haiku not found!",
            };
        }

        return {
            success: true,
            message: "Haiku fetched successfully.",
            haiku,
        };
    } catch (error) {
        console.error("Error fetching haiku:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
