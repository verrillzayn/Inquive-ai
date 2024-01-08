import Navbar from "@/components/marketing-page/navbar";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
