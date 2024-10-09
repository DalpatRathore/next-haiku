import HaikuForm from "@/components/forms/HaikuForm";
import React from "react";

const CreateHaikuPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-evenly py-6 px-5 gap-5">
      <div className="w-full">
        <HaikuForm formType="Create"></HaikuForm>
      </div>
    </div>
  );
};

export default CreateHaikuPage;
