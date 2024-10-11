"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useAuth } from "@/context/AuthContext";

const LogoutUser = () => {
  const { logoutUser } = useAuth(); // Use context logout
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(); // Call the context logout
    router.replace("/sign-in"); // Redirect after logout
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Logout</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogoutUser;
