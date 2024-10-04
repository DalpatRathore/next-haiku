"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

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

const HaikuForm = () => {
  const form = useForm<z.infer<typeof haikuFormSchema>>({
    resolver: zodResolver(haikuFormSchema),
    defaultValues: {
      line1: "",
      line2: "",
      line3: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof haikuFormSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-full mx-auto max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Haiku</CardTitle>
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
                    <FormLabel>#Line1</FormLabel>
                    <FormControl>
                      <Input placeholder="line1" {...field} />
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
                    <FormLabel>#Line2</FormLabel>
                    <FormControl>
                      <Input placeholder="line2" {...field} />
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
                    <FormLabel>#Line3</FormLabel>
                    <FormControl>
                      <Input placeholder="Line3" {...field} />
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
