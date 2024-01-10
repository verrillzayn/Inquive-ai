import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Icons = {
  userIcon: PersonIcon,
  User: ({ className, ...props }: AvatarProps) => {
    const { user, isLoading } = useKindeBrowserClient();

    return (
      <>
        {isLoading || !user || !user.id || !user.picture ? (
          <PersonIcon className={cn("h-4 w-4", className)} />
        ) : (
          <Avatar {...props} className={cn("h-full w-full", className)}>
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={user.picture}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
            <AvatarFallback>{user.given_name?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      </>
    );
  },
  logo: ({ className, ...props }: AvatarProps) => (
    <Avatar {...props} className={cn("h-full w-full", className)}>
      <div className="relative aspect-square h-full w-full">
        <Image
          fill
          src="/logo.png"
          alt="profile picture"
          referrerPolicy="no-referrer"
          className="hidden dark:block"
        />
        <Image
          fill
          src="/logo-dark.png"
          alt="profile picture"
          referrerPolicy="no-referrer"
          className="block dark:hidden"
        />
      </div>
      <AvatarFallback>I</AvatarFallback>
    </Avatar>
  ),
};
