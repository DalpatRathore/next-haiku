import React from "react";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserAccount from "./UserAccount";

const Header = () => {
  const authUser = false;
  return (
    <header className="border-b ">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center justify-center gap-2">
            <Image src={"/logo.svg"} width={75} height={75} alt="logo" />
            <h1 className="hidden md:block text-2xl font-bold">
              <span className="text-[#4e4187]">Next</span>
              <span className="text-[#fca311]">Haiku</span>
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {authUser ? (
              <>
                <UserAccount></UserAccount>

                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  className="flex items-center gap-2"
                  title="Logout"
                >
                  <LogOutIcon className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant={"outline"}
                title="Login"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={"/sign-in"}>
                  <span className="hidden md:block">Login</span>
                  <LogInIcon className="w-4 h-4" />
                </Link>
              </Button>
            )}

            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
