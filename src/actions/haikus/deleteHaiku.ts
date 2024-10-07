"use server";

import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import HaikuModel from "@/models/haiku.model"; 
import { revalidatePath } from "next/cache";

const JWT_SECRET = process.env.JWT_SECRET!;

export const deleteHaiku = async (haikuId: string) => {
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

        // Delete the haiku associated with the userId and haikuId
        const deletedHaiku = await HaikuModel.findOneAndDelete({
            _id: haikuId,
            user: decodedToken.userId,
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
