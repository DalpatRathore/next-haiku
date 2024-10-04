"use server";

import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import HaikuModel from "@/models/haiku.model"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const getHaiku = async (haikuId:string) => {
    try {
        const cookieStore = cookies(); 
        const token = cookieStore.get("mynexthaiku")?.value; // Retrieve the JWT token

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

         // Fetch haiku associated with the userId from the decoded token using lean
         const haiku = await HaikuModel.findById({_id:haikuId, user: decodedToken.userId }).lean();


        // Return success with the list of haiku
        return {
            success: true,
            message: "Haiku fetched successfully.",
            haiku, // Return the haiku retrieved from the database
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching haiku:", error);
        return {
            success: false,
            message: "An unexpected error occurred while fetching haiku.", // Return an error message
        };
    }
};
