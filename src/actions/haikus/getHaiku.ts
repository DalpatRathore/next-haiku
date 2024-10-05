"use server";

import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import HaikuModel from "@/models/haiku.model"; 

const JWT_SECRET = process.env.JWT_SECRET!;

export const getHaiku = async (haikuId: string) => {
    try {

        const cookieStore = cookies(); 
        const token = cookieStore.get("mynexthaiku")?.value;

        // Check if the token exists
        if (!token) {
            return {
                success: false,
                message: "User is not authenticated.",
            };
        }

        // Verify the JWT token and decode it
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Validate that the decoded token contains a valid userId
        if (typeof decodedToken === "string" || !decodedToken.userId) {
            return {
                success: false,
                message: "Invalid token.",
            };
        }

        // Fetch haiku associated with the haikuId and userId
        const haiku = await HaikuModel.findOne({ _id: haikuId, user: decodedToken.userId }).lean();

        if (!haiku) {
            return {
                success: false,
                message: "Haiku not found or you don't have permission to view it.",
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
            message: "An unexpected error occurred while fetching haiku.",
        };
    }
};
