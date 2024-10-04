import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { JwtPayload } from "jsonwebtoken";

import {
  AtSignIcon,
  CircleUserRoundIcon,
  CogIcon,
  LogOutIcon,
  Settings2Icon,
} from "lucide-react";

type UserAccountProps = {
  authUser: { name: string } | JwtPayload;
};
const UserAccount = ({ authUser: { name } }: UserAccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
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
                  <p className="truncate">example@example.com</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>example@example.com</p>
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
