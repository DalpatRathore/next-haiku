"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import React, { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { haikuFormSchema } from "@/types/types";
import { Separator } from "../ui/separator";
import { Loader2Icon, SlidersHorizontalIcon } from "lucide-react";
import { createHaiku } from "@/actions/haikus/createHaiku";
import { updateHaiku } from "@/actions/haikus/updateHaiku";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Haiku } from "../HaikuCard";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

type HaikuFormProps = {
  formType: "Create" | "Update";
  haiku?: Haiku;
};

const HaikuForm = ({ formType, haiku }: HaikuFormProps) => {
  const router = useRouter();
  const [signature, setSignature] = useState("");
  const [publicId, setPublicId] = useState("");
  const [version, setVersion] = useState("");
  const form = useForm<z.infer<typeof haikuFormSchema>>({
    resolver: zodResolver(haikuFormSchema),
    defaultValues: {
      line1: haiku?.line1 || "",
      line2: haiku?.line2 || "",
      line3: haiku?.line3 || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof haikuFormSchema>) => {
    try {
      const formData = new FormData();
      formData.append("line1", values.line1);
      formData.append("line2", values.line2);
      formData.append("line3", values.line3);
      formData.append("signature", signature);
      formData.append("publicId", publicId);
      formData.append("version", version);

      if (formType === "Create") {
        await createHaiku(formData);
        toast.success("Haiku created successfully!");
      } else if (formType === "Update" && haiku) {
        await updateHaiku(formData, haiku._id);
        toast.success("Haiku updated successfully!");
      }
      form.reset();
      return router.replace("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };
  useEffect(() => {
    if (haiku) {
      form.reset({
        line1: haiku?.line1 || "",
        line2: haiku?.line2 || "",
        line3: haiku?.line3 || "",
      });
    }
  }, [haiku, form]);

  if (formType === "Update" && !haiku) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <Card className="text-center h-32 flex items-center justify-center">
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

  return (
    <div className="flex">
      <Card className="w-full mx-auto max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{formType} Haiku</CardTitle>
          <CardDescription>
            Haiku consists of three lines, with five syllables in first line,
            seven in second, & five in third.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-5"></Separator>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="line1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <SlidersHorizontalIcon className="w-3 h-3" /> Line #1
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Type Line #1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="line2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <SlidersHorizontalIcon className="w-3 h-3" /> Line #2
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Type Line #2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="line3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <SlidersHorizontalIcon className="w-3 h-3" /> Line #3
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Type Line #1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                {publicId ? (
                  <div className="flex items-center justify-center">
                    <CldImage
                      width="100"
                      height="100"
                      src={publicId}
                      sizes="100vw"
                      alt=""
                    />
                  </div>
                ) : (
                  <CldUploadWidget
                    options={{ sources: ["local", "unsplash"] }}
                    onSuccess={result => {
                      // Check if result.info is defined and is of type CloudinaryUploadWidgetInfo
                      const info = result.info as CloudinaryUploadWidgetInfo; // Type assertion
                      if (info) {
                        // console.log(info);
                        setPublicId(info.public_id || "");
                        setSignature(info.signature || "");
                        setVersion(info.version ? info.version.toString() : "");
                      }
                    }}
                    onQueuesEnd={(_result, { widget }) => {
                      widget.close();
                    }}
                    signatureEndpoint="/api/cloudinary-signature"
                  >
                    {({ open }) => {
                      const handleClick = (e: FormEvent) => {
                        e.preventDefault();
                        open();
                      };
                      return (
                        <Button
                          size={"lg"}
                          className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                          onClick={handleClick}
                        >
                          {formType === "Create"
                            ? "Upload Image"
                            : "Upload New Image"}
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                )}
              </div>

              <Separator className="my-5"></Separator>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Processing...
                    <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />
                  </>
                ) : formType === "Create" ? (
                  "Create Haiku"
                ) : (
                  "Update Haiku"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t know about haikus?{" "}
            <Link href="/about-haiku" className="underline">
              See Examples
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HaikuForm;
