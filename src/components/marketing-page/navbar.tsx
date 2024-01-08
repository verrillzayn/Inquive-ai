import MaxWidthWrapper from "@/components/max-widht-wrapper";
import ThemeToogle from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-primary/5 bg-primary-foreground/75 backdrop-blur-lg transition-all dark:border-b-0">
      <MaxWidthWrapper className="max-w-6xl">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="z-40 flex font-semibold">
            <span>Inquive</span>
          </Link>

          {/* Todo: add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <ThemeToogle />
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href="/pricing"
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Get Started <ArrowRightIcon className="ml-1.5 h-4 w-4" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
