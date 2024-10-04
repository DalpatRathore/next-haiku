import { z } from "zod";

export const registerFormSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters long.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  });

  export const loginFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  });

  // Utility function to count syllables
const countSyllables = (line: string): number => {
  // A simple heuristic method to count syllables. There are more advanced ways.
  return line
    .toLowerCase()
    .match(/[aeiouy]+[^$e(,.:;]/g)?.length || 0; 
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
});

