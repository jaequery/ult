"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { useUserContext } from "../user/UserContext";

export default function VerifyEmail() {
  const { trpc } = useTrpc();
  const router = useRouter();
  const { setAccessToken, currentUser } = useUserContext();
  const [token] = useQueryParam("token", withDefault(StringParam, ""));

  const userJwt = trpc.userRouter.verifyAccessToken.useQuery({
    accessToken: token,
  });

  useEffect(() => {
    if (userJwt.data) {
      setAccessToken(token, userJwt.data.jwt.expiresIn);
    }
  }, [userJwt, setAccessToken, token]);

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
            <div className="flex-none text-xl font-semibold sm:text-3xl dark:text-white">
              Email Verification
            </div>
          </nav>
        </header>
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {token
              ? "Verifying..."
              : "Please check your email to verify your account"}
          </p>
        </div>
      </div>
    </div>
  );
}
