"use client";
import { logoutUser } from "@/actions/user/logoutUser";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutUser = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    router.replace("/sign-in");
  };
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"icon"}
      className="flex items-center gap-2"
      title="Logout"
      onClick={handleLogout}
    >
      <LogOutIcon className="w-4 h-4" />
    </Button>
  );
};

export default LogoutUser;
