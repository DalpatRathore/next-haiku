import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HomeIcon, ImageIcon, ImagePlusIcon, Settings } from "lucide-react";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const AsideNavigation = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex pt-20">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} asChild variant={"outline"}>
              <Link href="/">
                <HomeIcon className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} asChild variant={"outline"}>
              <Link href="/dashboard">
                <DashboardIcon className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} asChild variant={"outline"}>
              <Link href="/create-haiku">
                <ImagePlusIcon className="h-5 w-5" />
                <span className="sr-only">Create Haiku</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Create Haiku</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} asChild variant={"outline"}>
              <Link href="/about-haiku">
                <ImageIcon className="h-5 w-5" />
                <span className="sr-only">About Haiku</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">About Haiku</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"outline"} disabled>
              <Link href="#">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default AsideNavigation;
