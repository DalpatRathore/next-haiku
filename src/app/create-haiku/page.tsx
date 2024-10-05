import HaikuForm from "@/components/forms/HaikuForm";
import SpinnerSvg from "@/components/SpinnerSvg";
import React from "react";

const CreateHaikuPage = () => {
  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row items-center justify-evenly py-6 px-5 gap-5">
      <div className="flex items-center justify-center w-full max-w-lg">
        <SpinnerSvg></SpinnerSvg>
      </div>
      <div className="w-full">
        <HaikuForm formType="Create"></HaikuForm>
      </div>
    </div>
  );
};

export default CreateHaikuPage;
