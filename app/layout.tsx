import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Stavmia",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-open-sans bg-white w-screen overflow-x-hidden`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}


