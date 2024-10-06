import React from "react";
import { Button } from "@/components/ui/button";
import {
  LogOutIcon,
  MenuIcon,
  ImagePlusIcon,
  TableOfContentsIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardIcon } from "@radix-ui/react-icons";
import { HomeIcon, ImageIcon } from "lucide-react";

const MobileAsideMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <TableOfContentsIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-20">
        <aside className="flex flex-col gap-2 mt-12">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetClose asChild>
                  <Link href="/">
                    <Button size="icon" variant="outline">
                      <HomeIcon className="h-4 w-4" />
                      <span className="sr-only">Home</span>
                    </Button>
                  </Link>
                </SheetClose>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <SheetClose asChild>
                  <Link href="/dashboard">
                    <Button size="icon" variant="outline">
                      <DashboardIcon className="h-4 w-4" />
                      <span className="sr-only">Dashboard</span>
                    </Button>
                  </Link>
                </SheetClose>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <SheetClose asChild>
                  <Link href="/create-haiku">
                    <Button size="icon" variant="outline">
                      <ImagePlusIcon className="h-4 w-4" />
                      <span className="sr-only">Create Haiku</span>
                    </Button>
                  </Link>
                </SheetClose>
              </TooltipTrigger>
              <TooltipContent side="right">Create Haiku</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <SheetClose asChild>
                  <Link href="/about-haiku">
                    <Button size="icon" variant="outline">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">About Haiku</span>
                    </Button>
                  </Link>
                </SheetClose>
              </TooltipTrigger>
              <TooltipContent side="right">About Haiku</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </aside>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
};

export default MobileAsideMenu;
