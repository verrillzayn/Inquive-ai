import MobileNav from "@/components/marketing-page/mobile-nav";
import UserAccountAvatar from "@/components/marketing-page/user-acc-avatar";
import MaxWidthWrapper from "@/components/max-widht-wrapper";
import ThemeToogle from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Navbar = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  const user = await getUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full backdrop-blur-lg transition-all dark:border-b-0">
      <MaxWidthWrapper className="max-w-6xl">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="z-40 flex font-semibold">
            <span>Inquive</span>
          </Link>

          <MobileNav
            isAuth={isAuth}
            email={user?.email ?? ""}
            imageUrl={user?.picture ?? ""}
            name={
              !user?.given_name || !user?.family_name
                ? "Your account"
                : `${user?.given_name} ${user?.family_name}`
            }
          />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                {/* <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                  href="/pricing"
                >
                  Pricing
                </Link> */}
                <LoginLink
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <ThemeToogle />
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Started <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <ThemeToogle />

                <UserAccountAvatar
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                  name={
                    !user.given_name || !user.family_name
                      ? "Your account"
                      : `${user.given_name} ${user.family_name}`
                  }
                />
                <span className="sr-only">Toggle user menu</span>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
