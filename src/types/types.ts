import { z } from "zod";
import {syllable} from "syllable";

export const registerFormSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please provide valid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  export const loginFormSchema = z.object({
    email: z.string().email({
      message: "Please provide valid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  export const resetPasswordFormSchema = z.object({
    email: z.string().email({
      message: "Please provide valid email.",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),

    pin: z.string().min(6, {
      message: "Your verification code must be 6 characters.",
    })
  });
  
  export const resendCodeFormSchema = z.object({
    email: z.string().email({
      message: "Please provide valid email.",
    }),
   
  });

  
   

 // Utility function to count syllables using the 'syllable' package
const countSyllables = (line: string): number => {
  return syllable(line);
};

// Custom Zod refinement for syllable validation
const haikuLine = (syllableCount: number) =>
  z.string().min(1, { message: "Please provide text." }).refine((line) => {
    return countSyllables(line) === syllableCount;
  }, { message: `Line must have exactly ${syllableCount} syllables.` });

export const haikuFormSchema = z.object({
  line1: haikuLine(5), // First line must have 5 syllables
  line2: haikuLine(7), // Second line must have 7 syllables
  line3: haikuLine(5), // Third line must have 5 syllables
  version: z.string().optional(),
  signature: z.string().optional(),
  publicId: z.string().optional(),
});

