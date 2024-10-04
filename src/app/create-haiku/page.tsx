import HaikuForm from "@/components/forms/HaikuForm";
import React from "react";

const CreateHaikuPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center py-8">
      <HaikuForm formType="Create"></HaikuForm>
    </div>
  );
};

export default CreateHaikuPage;
