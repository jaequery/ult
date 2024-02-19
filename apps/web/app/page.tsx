"use client";

import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
import { useCallback } from "react";
import { trpc } from "./trpc";

export default function Home() {
  const {
    data: users,
    isLoading,
    error,
  } = useTrpcQuery(useCallback(() => trpc.users.findAll.query({}), []));

  if (error) {
    return <>here was error{error.message}</>;
  }
  if (isLoading) {
    return <>its loading ...</>;
  }
  return <div>gai {JSON.stringify(users)}</div>;
}
