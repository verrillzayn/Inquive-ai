import Navbar from "@/components/marketing-page/navbar";
import { PropsWithChildren } from "react";

const PricingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PricingLayout;
