import React from "react";
import { Button } from "./ui/button";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Footer = () => {
  return (
    <footer className="p-4 md:p-6 border-t">
      <div className="mx-auto max-w-screen-xl flex flex-wrap items-center justify-center gap-3">
        <TooltipWrapper text="JavaScript">
          <SiJavascript className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="React">
          <SiReact className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="TypeScript">
          <SiTypescript className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Next.js">
          <SiNextdotjs className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="MongoDB">
          <SiMongodb className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Tailwind CSS">
          <SiTailwindcss className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Framer Motion">
          <SiFramer className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Zod">
          <SiZod className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Cloudinary">
          <SiCloudinary className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="GitHub">
          <SiGithub className="w-4 h-4" />
        </TooltipWrapper>
        <TooltipWrapper text="Shadcn">
          <SiShadcnui className="w-4 h-4" />
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
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
