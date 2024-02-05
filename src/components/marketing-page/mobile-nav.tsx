import LogOutButton from "@/components/marketing-page/log-out-button";
import ThemeToogle from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRightIcon,
  HamburgerMenuIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface IMobileNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string | undefined;
  isAuth: boolean;
}

const MobileNav = ({ email, imageUrl, isAuth, name }: IMobileNavProps) => {
  return (
    <>
      <div className="ml-52 pt-[1px] sm:hidden">
        <ThemeToogle />
      </div>

      <Sheet>
        <SheetTrigger aria-label="menu button" className="sm:hidden">
          <HamburgerMenuIcon className="mr-3 h-5 w-5 text-primary/70" />
        </SheetTrigger>
        <SheetContent side="top" className="rounded-b-lg">
          <SheetHeader>
            <SheetTitle>Inquive</SheetTitle>
          </SheetHeader>
          <div className="pt-10">
            <ul className="flex flex-col">
              <li className="flex border-b-[1.5px] py-3 font-semibold text-primary/80">
                <Link
                  className="flex w-full py-1"
                  href={isAuth ? "/dashboard" : "sign-in"}
                >
                  {isAuth ? "Dashboard" : "Get started"}{" "}
                  <ArrowRightIcon className="ml-4 mt-0.5 h-5 w-5" />
                </Link>
              </li>
              <li className="flex border-b-[1.5px] py-3 font-semibold text-primary/80">
                <Link className="flex w-full py-1" href="/pricing">
                  {isAuth ? (
                    <>
                      Upgrade <RocketIcon className="ml-4 mt-0.5 h-5 w-5" />
                    </>
                  ) : (
                    "Pricing"
                  )}
                </Link>
              </li>
              <li className="flex py-3 font-semibold text-primary/80">
                {isAuth ? (
                  <LogOutButton />
                ) : (
                  <Link className="w-full py-1" href="/sign-in">
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className="border-t-[1.5px]" />
          {isAuth ? (
            <div className="mt-10 text-center">
              <Avatar className="mx-auto">
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
                    <PersonIcon className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                )}
              </Avatar>
              {name && (
                <p className="mt-3 text-sm font-medium text-primary">{name}</p>
              )}
              {email && (
                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>
              )}
            </div>
          ) : (
            <div className="mx-auto mb-10 w-fit pt-7">
              <ThemeToogle />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
