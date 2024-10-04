import React from "react";
import { Button } from "./ui/button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserAccount from "./UserAccount";
import { getUser } from "@/actions/user/getUser";
import LogoutUser from "./LogoutUser";

const Header = async () => {
  const authUser = await getUser();

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
            {authUser.user ? (
              <>
                <UserAccount user={authUser.user}></UserAccount>
                <LogoutUser></LogoutUser>
              </>
            ) : (
              <Button
                type="button"
                variant={"outline"}
                title="Login"
                className="flex items-center gap-2"
                asChild
                size={"icon"}
              >
                <Link href={"/sign-in"}>
                  <SquareArrowOutUpRightIcon className="w-4 h-4" />
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
