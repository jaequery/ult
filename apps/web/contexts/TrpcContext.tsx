"use client";

import { AppRouter } from "@server/trpc/trpc.router"; // Adjust the import path as necessary
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CreateTRPCClientOptions,
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import Cookies from "js-cookie";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { transformer } from "@shared/transformer";

const trpc = createTRPCReact<AppRouter>();
const trpcUrl =
  process.env.NEXT_PUBLIC_TRPC_URL || "http://localhost:3001/trpc"; // Default URL as fallback
const jwtAccessToken = Cookies.get("jwtAccessToken");
const httpBatchLinkOptions = {
  url: trpcUrl,
  transformer,
  headers: jwtAccessToken
    ? {
        Authorization: `Bearer ${jwtAccessToken}`,
      }
    : undefined,
};
const trpcClientOpts: CreateTRPCClientOptions<AppRouter> = {
  links: [httpBatchLink(httpBatchLinkOptions)],
  transformer,
};

const trpcReactClient = trpc.createClient(trpcClientOpts);
const trpcAsync = createTRPCProxyClient<AppRouter>(trpcClientOpts);

interface TrpcContextState {
  trpc: typeof trpc;
  trpcAsync: typeof trpcAsync;
}

// Context will now directly store the trpc client
const TrpcContext = createContext<TrpcContextState>({
  trpc,
  trpcAsync,
});
export const TrpcProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpcReactClient);
  return (
    <TrpcContext.Provider
      value={{
        trpc,
        trpcAsync: trpcAsync,
      }}
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </TrpcContext.Provider>
  );
};
export const useTrpc = () => {
  const context = useContext(TrpcContext);
  if (context === undefined) {
    throw new Error("useTrpc must be used within a TrpcProvider");
  }
  return context;
};
