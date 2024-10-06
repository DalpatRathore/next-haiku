"use client";
import { logoutUser } from "@/actions/user/logoutUser";
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

const LogoutUser = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    router.replace("/sign-in");
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
