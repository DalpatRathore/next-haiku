import { getHaikus } from "@/actions/haikus/getHaikus";
import HaikuCard, { Haiku } from "@/components/HaikuCard";
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
          createdAt: new Date(haiku.createdAt),
          updatedAt: new Date(haiku.updatedAt),
        }))
      : [];
  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-8">
      <div className="mx-auto max-w-screen-xl px-4 mb-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Your Amazing Haikus.
          </h1>
        </div>
      </div>
      {haikus.length <= 0 ? "" : <HaikuCard haikus={haikus} />}
    </div>
  );
};

export default DashboardPage;
