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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
        <Avatar className="border p-1  w-12 h-12 cursor-pointer">
          <AvatarImage
            src={`https://avatar.iran.liara.run/username?username=${name}`}
          />
          <AvatarFallback className="uppercase">
            {name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
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
