import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "./_components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "StealStorage",
  description: "Free Cloud Storage",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex min-h-screen flex-col items-center justify-center text-white bg-[#18181B] overflow-y-hidden`}>
        <TRPCReactProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

