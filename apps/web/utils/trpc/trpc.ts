import { AppRouter } from "@server/trpc/trpc.router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import Cookies from "js-cookie";

const jwtAccessToken = Cookies.get("jwtAccessToken");

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc", // you should update this to use env variables
      headers: jwtAccessToken
        ? {
            Authorization: `Bearer ${jwtAccessToken}`,
          }
        : undefined,
    }),
  ],
});
