"use client";

import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useState } from "react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import Header from "../Header";

export default function PlainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <>
      <div className="container mx-auto p-4">
        {/* Header */}
        <Header />
        {/* Main content */}
        <div className="flex flex-col lg:flex-row mt-8">
          {/* Sidebar */}

          <div className="w-full lg:px-24 sm:px-8 px-2" style={{}}>
            {children}
          </div>

          {/* Right sidebar */}
        </div>
      </div>
    </>
  );
}
