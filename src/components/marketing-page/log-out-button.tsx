"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ExitIcon } from "@radix-ui/react-icons";

const LogOutButton = () => {
  return (
    <LogoutLink className="flex text-destructive/90">
      Log out <ExitIcon className="ml-4 mt-0.5 h-5 w-5" />
    </LogoutLink>
  );
};

export default LogOutButton;
