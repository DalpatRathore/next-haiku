import VerifyOTPForm from "@/components/forms/VerifyOTPForm";
import SpinnerSvg from "@/components/SpinnerSvg";
import { Separator } from "@/components/ui/separator";
import React from "react";

const VerifyEmailPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-6">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Verify Your Email
          </h1>
        </div>
      </div>
      <Separator className="my-8"></Separator>
      <div className="w-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full flex items-center justify-center">
          <SpinnerSvg></SpinnerSvg>
        </div>
        <div className="w-full">
          <VerifyOTPForm userId={params.userId}></VerifyOTPForm>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
