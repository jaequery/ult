"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import PrelineScript from "@web/components/PrelineScript";
import { TrpcProvider } from "@web/contexts/TrpcContext";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";
import "./globals.css";
import { UserProvider } from "./user/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TrpcProvider>
      <QueryParamProvider adapter={NextAdapterApp}>
        <UserProvider>
          <html>
            <body>
              {children}
              <GoogleTagManager
                gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ""}
              />
            </body>
          </html>
          <PrelineScript />
        </UserProvider>
      </QueryParamProvider>
    </TrpcProvider>
  );
}
