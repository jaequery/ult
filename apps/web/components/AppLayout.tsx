"use client";

import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <QueryParamProvider adapter={NextAdapterApp}>
        <Header />
        {children}
        <Footer />
      </QueryParamProvider>
    </Suspense>
  );
}
