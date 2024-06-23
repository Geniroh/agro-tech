import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/context/AppContext";

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={`font-open-sans bg-white w-screen overflow-x-hidden`}>
        <SessionProvider>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#329632",
                },
              }}
            >
              <AppProvider>{children}</AppProvider>
            </ConfigProvider>
          </AntdRegistry>
          {/* <Toaster position="top-right" richColors /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
