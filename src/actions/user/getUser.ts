"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserModel from "@/models/user.model";
import dbConnect from "@/config/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET!

export const getUser = async () => {
    try {
        await dbConnect();

        const cookieStore = cookies();
        const token = cookieStore.get("mynexthaiku")?.value;

        if (!token) {
            return {
                success: false,
                message: "User is not authenticated.",
            };
        }

        // Verify the JWT token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Check if decodedToken is a valid JWT payload
        if (typeof decodedToken === "string" || !decodedToken.userId) {
            return {
                success: false,
                message: "Invalid token.",
            };
        }

        // Fetch the user from the database using the userId from the token
        const user = await UserModel.findById(decodedToken.userId).select("-password"); // Exclude the password from the returned user
        
        if (!user) {
            return {
                success: false,
                message: "User not found.",
            };
        }

           // Convert the Mongoose document to a plain object
           const userObject = user.toObject();

           // Return the plain user object
           return {
               success: true,
               user: userObject,
           };
    } catch (error) {
        console.error("Error fetching user:", error);
        return {
            success: false,
            message: "An unexpected error occurred while fetching user.",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
