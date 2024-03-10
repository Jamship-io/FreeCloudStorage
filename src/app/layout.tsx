import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "./_components/providers/SessionProvider";
// import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

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
  const session = await getSession()
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white`}>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </TRPCReactProvider>

      </body>
    </html>
  );
}

