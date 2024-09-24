import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "src/lib/utils";

import { type Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "src/trpc/react";
import { dark } from "@clerk/themes";
import { Provider } from "./Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Live Docs",
  description: "Your go-to collaborative documentation platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3371ff", fontSize: "16px" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <TRPCReactProvider>
            <Provider>{children}</Provider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
