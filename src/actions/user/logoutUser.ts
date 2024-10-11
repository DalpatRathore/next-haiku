"use server"; 

import { deleteToken } from "@/lib/authUtils";

export const logoutUser = async () => {
    try {
        deleteToken();

    } catch (error) {
        console.error("Error logging out:", error);
    }
};
