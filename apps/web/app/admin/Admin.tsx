"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useUserContext } from "../user/UserContext";

export default function Admin() {
  const { accessToken, currentUser } = useUserContext();
  const { trpc } = useTrpc();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-center justify-center px-6 py-12 lg:px-8">
        Welcome to admin, {currentUser?.firstName}!
      </div>
    </>
  );
}
