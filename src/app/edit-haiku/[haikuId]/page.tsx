import { getHaiku } from "@/actions/haikus/getHaiku";
import HaikuForm from "@/components/forms/HaikuForm";
import { Haiku } from "@/components/HaikuCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
type HaikuResponse = {
  success: boolean;
  message: string;
  haiku?: Haiku;
};

const EditHaikuIdPage = async ({ params }: { params: { haikuId: string } }) => {
  const response = (await getHaiku(params.haikuId)) as HaikuResponse;

  if (!response.success || !response.haiku) {
    return (
      <div className="w-full h-full max-w-lg mx-auto flex flex-col items-center justify-center">
        <Card className=" w-full text-center h-32 flex items-center justify-center">
          <CardContent className="p-0">
            <p className="text-lg font-semibold">No record found!</p>
          </CardContent>
        </Card>
        <div className="mt-10 flex items-center justify-center">
          <Button variant={"outline"} className="">
            <Link href={"/dashboard"}>Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const haiku = {
    _id: response.haiku._id.toString(),
    line1: response.haiku.line1,
    line2: response.haiku.line2,
    line3: response.haiku.line3,
    createdAt: new Date(response.haiku.createdAt),
    updatedAt: new Date(response.haiku.updatedAt),
  };

  return (
    <div className="h-full w-full flex items-center justify-center py-8">
      <HaikuForm formType="Update" haiku={haiku}></HaikuForm>
    </div>
  );
};

export default EditHaikuIdPage;
