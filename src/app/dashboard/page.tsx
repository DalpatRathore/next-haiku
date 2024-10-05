import { getHaikus } from "@/actions/haikus/getHaikus";
import HaikuCard, { Haiku } from "@/components/HaikuCard";
import SpinnerSvg from "@/components/SpinnerSvg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

type HaikusResponse = {
  success: boolean;
  message: string;
  haikus?: Haiku[]; // Updated to use Haiku type
};

const DashboardPage = async () => {
  const response = (await getHaikus()) as HaikusResponse;
  const haikus: Haiku[] =
    response.success && response.haikus
      ? response.haikus.map(haiku => ({
          _id: haiku._id.toString(), // Convert ObjectId to string
          line1: haiku.line1,
          line2: haiku.line2,
          line3: haiku.line3,
          photoId: haiku.photoId,
          createdAt: new Date(haiku.createdAt),
          updatedAt: new Date(haiku.updatedAt),
        }))
      : [];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-6">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Your Amazing Haikus.
          </h1>
        </div>
      </div>
      <Separator className="my-8"></Separator>

      {haikus.length === 0 ? (
        <div className="w-full bg-[#fca311] font-sans min-h-[25rem] relative max-w-5xl px-5 mx-auto rounded overflow-hidden">
          <div className="flex flex-col md:flex-row h-full items-center justify-center text-right px-8 relative bg-[#262464] rounded-tl-[206px] z-20 before:absolute before:inset-0 before:!left-auto before:bg-[#1d2a7b] before:w-2/3 before:rounded-bl-[206px] before:-z-10">
            <div className="flex items-center justify-center">
              <SpinnerSvg></SpinnerSvg>
            </div>
            <div className="max-w-lg text-center md:text-left py-5">
              <h3 className="font-bold sm:text-3xl text-2xl text-[#fca311]">
                Unlock Your Poetry Potential
              </h3>
              <p className="text-base text-gray-300 mt-4">
                The haiku is a Japanese poetic form that consists of three
                lines, with five syllables in the first line, seven in the
                second, and five in the third
              </p>
              <div className="mt-10 flex items-center justify-center md:justify-end">
                <Button type="button" size={"lg"} variant={"outline"} asChild>
                  <Link href={"/create-haiku"}>Create Haiku</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HaikuCard haikus={haikus} />
      )}
    </div>
  );
};

export default DashboardPage;
