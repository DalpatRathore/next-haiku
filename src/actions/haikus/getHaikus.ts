"use server";

import HaikuModel from "@/models/haiku.model"; 
import { verifyToken } from "@/lib/authUtils";
import dbConnect from "@/config/dbConnect";


export const getHaikus = async () => {
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

        await dbConnect();
        // Fetch haikus associated with the userId from the decoded token
        const haikus = await HaikuModel.find({ user: userId })
            .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
            .lean();

        // Return success with the list of haikus
        return {
            success: true,
            message: "Haikus fetched successfully.",
            haikus, // Return the haikus retrieved from the database
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching haikus:", error);
        return {
            success: false,
            message: "Something went wrong.", // Return an error message
        };
    }
};
