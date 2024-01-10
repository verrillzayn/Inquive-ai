import Navbar from "@/components/marketing-page/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="z-50 flex w-full items-center p-6">
        <div className="hidden items-center gap-x-2 md:flex">
          <Image
            src="/logo.png"
            height="40"
            width="40"
            alt="App Logo"
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            height="40"
            width="40"
            alt="App Logo"
            className="hidden dark:block"
          />
          <p className="font-semibold">Inquive</p>
        </div>
        <div className="flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarketingLayout;
