import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiFramer,
  SiZod,
  SiCloudinary,
  SiGithub,
  SiJavascript,
  SiShadcnui,
} from "react-icons/si";
import { TooltipProvider } from "./ui/tooltip";

const Footer = () => {
  return (
    <footer className="p-4 md:p-6 border-t">
      <div className="mx-auto max-w-screen-xl flex flex-wrap items-center justify-center gap-6">
        <TooltipWrapper text="JavaScript">
          <SiJavascript className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="React">
          <SiReact className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="TypeScript">
          <SiTypescript className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Next.js">
          <SiNextdotjs className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="MongoDB">
          <SiMongodb className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Tailwind CSS">
          <SiTailwindcss className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Framer Motion">
          <SiFramer className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Zod">
          <SiZod className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Cloudinary">
          <SiCloudinary className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="GitHub">
          <SiGithub className="w-5 h-5" />
        </TooltipWrapper>
        <TooltipWrapper text="Shadcn">
          <SiShadcnui className="w-5 h-5" />
        </TooltipWrapper>
      </div>
    </footer>
  );
};

export default Footer;

// TooltipWrapper component to handle tooltips
const TooltipWrapper = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <span className="text-sm">{text}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
