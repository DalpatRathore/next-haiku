"use server";

import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import HaikuModel from "@/models/haiku.model"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const getHaikus = async () => {
    try {
        const cookieStore = cookies(); 
        const token = cookieStore.get("mynexthaiku")?.value; 

        // Check if the token exists
        if (!token) {
            return {
                success: false,
                message: "User is not authenticated.", // User is not logged in
            };
        }

        // Verify the JWT token and decode it
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Validate that the decoded token contains a valid userId
        if (typeof decodedToken === "string" || !decodedToken.userId) {
            return {
                success: false,
                message: "Invalid token.", // Token is invalid or userId is missing
            };
        }


        // Fetch haikus associated with the userId from the decoded token
        const haikus = await HaikuModel.find({ user: decodedToken.userId })
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
