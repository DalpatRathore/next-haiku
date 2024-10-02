import React from "react";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b ">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <Link href={"/"} className="flex items-center justify-center gap-2">
            <Image src={"/logo.svg"} width={75} height={75} alt="logo" />
            <h1 className="hidden md:block text-2xl font-bold">Next Haiku</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={"outline"}
              title="Login"
              className="flex items-center gap-2"
            >
              <span className="hidden md:block">Login</span>
              <LogInIcon className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant={"outline"}
              className="flex items-center gap-2"
              title="Logout"
            >
              <span className="hidden md:block">Logout</span>

              <LogOutIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
