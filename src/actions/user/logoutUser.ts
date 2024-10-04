"use server"; 

import { cookies } from "next/headers";

export const logoutUser = async () => {
    try {
        // Clear the authentication cookie
        cookies().set("mynexthaiku", "", {
            httpOnly: true,
            sameSite: "strict",
            maxAge: -1, // Setting maxAge to -1 will expire the cookie immediately
            secure: true,
        });

    } catch (error) {
        console.error("Error logging out:", error);
    }
};
