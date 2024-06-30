"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "react-query";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Stavmia</title>
        <meta
          name="description"
          content="Sustainable Technologies for Agricultural Value-Chain Mechanization in Africa."
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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
              <AppProvider>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </AppProvider>
            </ConfigProvider>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
