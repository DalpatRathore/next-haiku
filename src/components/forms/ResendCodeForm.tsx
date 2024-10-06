"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { resendCodeFormSchema } from "@/types/types";
import { resendVerificationCode } from "@/actions/user/resendVerificationCode";

import toast from "react-hot-toast";
import { useState } from "react";
import { sendPasswordResetCode } from "@/actions/user/sendPasswordResetCode";

type ResendCodeFormProps = {
  actionType: "verification" | "passwordReset"; // Define the action type
};

const ResendCodeForm = ({ actionType }: ResendCodeFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update the default values based on action type if needed
  const form = useForm<z.infer<typeof resendCodeFormSchema>>({
    resolver: zodResolver(resendCodeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resendCodeFormSchema>) => {
    try {
      let response;
      // Trigger action based on actionType
      if (actionType === "verification") {
        response = await resendVerificationCode(values.email);
      } else if (actionType === "passwordReset") {
        response = await sendPasswordResetCode(values.email);
      }

      if (response?.success) {
        toast.success(response.message);
        setIsDialogOpen(false);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {actionType === "verification" ? (
          <Button
            variant="outline"
            className="w-64"
            onClick={() => setIsDialogOpen(true)}
          >
            Resend Verification Code
          </Button>
        ) : (
          <Button variant="link" onClick={() => setIsDialogOpen(true)}>
            Forgot your password?
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>
            {actionType === "verification"
              ? "Request Verification Code"
              : "Request Password Reset Code"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please enter your registered email.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-10 left-0" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResendCodeForm;
