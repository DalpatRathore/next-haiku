"use server";
import UserModel from "@/models/user.model";
import dbConnect from "@/config/dbConnect";
import { verifyToken } from "@/lib/authUtils";

export const getUser = async () => {
    try {

        const userId = verifyToken();

        if (!userId) {
            return {
                success: false,
                message: "User is not authenticated or token is invalid.",
            };
        }
        await dbConnect();
        const user = await UserModel.findById(userId).select("-password"); 

        if (!user) {
            return {
                success: false,
                message: "Account not found. Please register first",
            };
        }
        // Convert the Mongoose document to a plain object
        const userObject = user.toObject();

        // Ensure userObject conforms to AuthUser.user structure
        const formattedUser = {
            name: userObject.name,
            email: userObject.email,
        };

        // Return the plain user object
        return {
            success: true,
            user: formattedUser,
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        return {
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
