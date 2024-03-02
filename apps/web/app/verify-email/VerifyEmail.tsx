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
    <>
      {accessToken
        ? "Verifying..."
        : "Please check your email to verify your account"}
    </>
  );
}
