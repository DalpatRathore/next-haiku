"use client";
import React from "react";
import {
  ImagePlusIcon,
  LogInIcon,
  SquareArrowOutUpRightIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserAccount from "./UserAccount";
import LogoutUser from "./LogoutUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import MobileAsideMenu from "./MobileAsideMenu";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { authUser } = useAuth();
  return (
    <header className="border-b">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src="/logo.svg"
              className="w-20 h-auto"
              alt="NextHaiku logo"
              width={192}
              height={74}
            />
            <h1 className="hidden md:flex text-2xl font-bold">
              <span className="text-[#4e4187]">Next</span>
              <span className="text-[#fca311]">Haiku</span>
            </h1>
          </Link>

          {/* User Navigation Section */}
          <div className="flex items-center gap-4">
            {authUser?.user ? (
              <>
                {/* Authenticated User Navigation */}
                <TooltipProvider>
                  <nav className="hidden md:flex items-center gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <Link href="/dashboard">
                            <DashboardIcon />
                            <span className="sr-only">Dashboard</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <Link href="/create-haiku">
                            <ImagePlusIcon className="w-4 h-4" />
                            <span className="sr-only">Create Haiku</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Create Haiku
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          asChild
                          variant="outline"
                          className="hidden md:flex"
                        >
                          <Link href="/about-haiku">
                            <ImageIcon className="h-5 w-5" />
                            <span className="sr-only">About Haiku</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">About Haiku</TooltipContent>
                    </Tooltip>
                  </nav>
                </TooltipProvider>

                <div className="block md:hidden">
                  <MobileAsideMenu />
                </div>
                <UserAccount user={authUser.user} />
                <LogoutUser />
              </>
            ) : (
              <>
                {/* Unauthenticated User Navigation */}
                <TooltipProvider>
                  <nav className="flex items-center gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <Link href="/sign-in">
                            <LogInIcon className="w-4 h-4" />
                            <span className="sr-only">Sign In</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Sign In</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                          <Link href="/sign-up">
                            <SquareArrowOutUpRightIcon className="w-4 h-4" />
                            <span className="sr-only">Sign Up</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Sign Up</TooltipContent>
                    </Tooltip>
                  </nav>
                </TooltipProvider>
              </>
            )}
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
