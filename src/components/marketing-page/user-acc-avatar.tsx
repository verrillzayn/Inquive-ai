"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ExitIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface IUserAccountAvatarProps {
  email: string | undefined;
  name: string;
  imageUrl: string | undefined;
}

const UserAccountAvatar = ({
  email,
  imageUrl,
  name,
}: IUserAccountAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-visible" asChild>
        <Button
          className={cn(
            "aspect-square h-8 w-8 rounded-full bg-muted-foreground",
            {
              "ring-1 ring-primary/25": !imageUrl,
            },
          )}
        >
          <Avatar className="relative h-8 w-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <PersonIcon className="h-4 w-4 text-primary" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-primary-foreground" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium text-primary">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pricing" className="flex justify-between pr-5">
            Upgrade <RocketIcon className="mr-2 h-4 w-4" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogoutLink className="flex w-full justify-between pr-5 text-destructive/90">
            Log out <ExitIcon className="ml-2 h-4 w-4" />
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountAvatar;
