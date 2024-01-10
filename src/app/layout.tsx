import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import TrpcProvider from "@/components/providers/trpc-providers";
import { Toaster } from "@/components/ui/sonner";

import "simplebar-react/dist/simplebar.min.css";

import { cn, constructMetadata } from "@/lib/utils";
import "@/style/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <TrpcProvider>
        <body
          className={cn(
            "grainy min-h-screen bg-background font-sans antialiased ",
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </TrpcProvider>
    </html>
  );
}
