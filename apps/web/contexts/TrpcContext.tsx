"use client";

import { AppRouter } from "@server/trpc/trpc.router"; // Adjust the import path as necessary
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import React, { ReactNode, createContext, useContext, useState } from "react";

const trpc = createTRPCReact<AppRouter>();
interface TrpcContextState {
  trpc: typeof trpc;
}

// Context will now directly store the trpc client
const TrpcContext = createContext<TrpcContextState>({ trpc });
export const TrpcProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const client = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => client);
  return (
    <TrpcContext.Provider
      value={{
        trpc,
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
