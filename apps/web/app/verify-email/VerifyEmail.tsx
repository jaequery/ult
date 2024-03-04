"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "../user/UserContext";

export default function VerifyEmail() {
  const { trpc } = useTrpc();
  const router = useRouter();
  const { setAccessToken, currentUser } = useUserContext();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("token") || "";
  const jwtUser = trpc.userRouter.verifyAccessToken.useQuery({
    accessToken,
  });

  useEffect(() => {
    if (jwtUser.data) {
      setAccessToken(accessToken, jwtUser.data.jwt.expiresIn);
    }
  }, [jwtUser, setAccessToken, accessToken]);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="flex min-h-full flex-1 flex-col text-center text- justify-center px-6 py-12 lg:px-8">
      <div className="max-w-[50rem] flex flex-col mx-auto size-full">
        <header className="mb-auto flex justify-center z-50 w-full py-4">
          <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
            <a
              className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Brand
            </a>
          </nav>
        </header>
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
            404
          </h1>
          <h1 className="block text-2xl font-bold text-white" />
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Oops, something went wrong.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find your page.
          </p>
          <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <a
              className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html"
              target="_blank"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Get the source code
            </a>
            <a
              className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="../examples.html"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to examples
            </a>
          </div>
        </div>
        <footer className="mt-auto text-center py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500">
              © All Rights Reserved. 2022.
            </p>
          </div>
        </footer>
      </div>

      {accessToken
        ? "Verifying..."
        : "Please check your email to verify your account"}
    </div>
  );
}
