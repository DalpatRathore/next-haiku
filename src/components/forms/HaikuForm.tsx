"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import React from "react";

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
import { createHaiku } from "@/actions/haikus/create-haiku";
import { updateHaiku } from "@/actions/haikus/update-haiku";
import toast from "react-hot-toast";

type HaikuFormProps = {
  formType: "Create" | "Update";
  haikuId?: string;
};

const HaikuForm = ({ formType, haikuId }: HaikuFormProps) => {
  const form = useForm<z.infer<typeof haikuFormSchema>>({
    resolver: zodResolver(haikuFormSchema),
    defaultValues: {
      line1: "",
      line2: "",
      line3: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof haikuFormSchema>) => {
    try {
      if (formType === "Create") {
        await createHaiku(values);
        toast.success("Haiku created successfully!");
      } else if (formType === "Update" && haikuId) {
        await updateHaiku(values);

        toast.success("Haiku updated successfully!");
      }
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
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
            <div className="space-y-3">
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
            <Separator className="my-5"></Separator>
            <Button type="submit" className="w-full">
              Create Haiku
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Submitting...
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
  );
};

export default HaikuForm;
