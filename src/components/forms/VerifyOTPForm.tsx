"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyEmailCode } from "@/actions/user/verifyEmailCode";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ResendCodeForm from "./ResendCodeForm";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your verification code must be 6 characters.",
  }),
});

type VerifyOTPFormProps = {
  userId: string;
};

const VerifyOTPForm = ({ userId }: VerifyOTPFormProps) => {
  const router = useRouter();
  const { authUser, refreshUser } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await verifyEmailCode(userId, values.pin);
      if (response.success) {
        await refreshUser();
        toast.success(response.message);
        form.reset();
        return router.replace("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during OTP submission:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    const checkUserVerification = async () => {
      // Check if the user is already verified
      if (authUser?.success) {
        return router.replace("/dashboard"); // Redirect to dashboard if verified
      } else {
        await refreshUser(); // Refresh user data if needed
      }
    };

    checkUserVerification();
  }, [authUser, router, refreshUser]);

  return (
    <Card className="p-10 mx-5">
      <CardHeader className="text-center">
        <CardTitle>Email Verification Code</CardTitle>
        <CardDescription>code valid for only 1 hour</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center justify-center space-y-5"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-3">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the verification sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-64" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Processing...
                  <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <ResendCodeForm actionType="verification"></ResendCodeForm>
      </CardFooter>
    </Card>
  );
};

export default VerifyOTPForm;
