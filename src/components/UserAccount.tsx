import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AtSignIcon,
  CircleUserRoundIcon,
  CogIcon,
  LogOutIcon,
  Settings2Icon,
} from "lucide-react";
import { Button } from "./ui/button";

type UserAccountProps = {
  user: {
    name: string;
    email: string;
  };
};
const UserAccount = ({ user: { name, email } }: UserAccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} className="bg-[#fca311]">
          <span className="uppercase text-xl">{name.slice(0, 1)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="truncate w-full">{name}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuShortcut>
              <CircleUserRoundIcon className="w-4 h-4 ml-2"></CircleUserRoundIcon>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="truncate">{email}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{email}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuShortcut>
              <AtSignIcon className="w-4 h-4 ml-2"></AtSignIcon>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Support
          <DropdownMenuShortcut>
            <Settings2Icon className="w-4 h-4 ml-2"></Settings2Icon>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Settings
          <DropdownMenuShortcut>
            <CogIcon className="w-4 h-4 ml-2"></CogIcon>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Logout
          <DropdownMenuShortcut>
            <LogOutIcon className="w-4 h-4"></LogOutIcon>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
