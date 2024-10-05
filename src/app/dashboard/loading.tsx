import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full max-w-7xl px-10 py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Your Amazing Haikus.
          </h1>
        </div>
      </div>
      <Separator className="my-8"></Separator>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 lg:gap-y-8">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default Loading;
