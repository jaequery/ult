"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { useUserContext } from "../../../user/UserContext";

export default function AuthGoogle() {
  const router = useRouter();
  const { setAccessToken, currentUser } = useUserContext();
  const [code] = useQueryParam("code", withDefault(StringParam, ""));

  useEffect(() => {
    const verifyGoogleCode = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`
      );
      const data = await response.json();
      if (data) {
        setAccessToken(data.jwt.accessToken, data.jwt.expiresIn);
        window.location.href = "/";
      }
    };
    if (code) {
      verifyGoogleCode();
    }
  }, [code, router, setAccessToken]);

  return (
    <div className="flex min-h-full flex-1 flex-col text-center text- justify-center px-6 py-12 lg:px-8">
      <div className="max-w-[50rem] flex flex-col mx-auto size-full">
        <header className="mb-auto flex justify-center z-50 w-full py-4">
          <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
            <div className="flex-none text-xl font-semibold sm:text-3xl dark:text-white">
              Authenticating ...
            </div>
          </nav>
        </header>
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Please wait while we verify your account
          </p>
        </div>
      </div>
    </div>
  );
}
