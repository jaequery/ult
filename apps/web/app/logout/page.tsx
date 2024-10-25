"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "../user/UserContext";

export default function LogoutPage() {
  const { logout } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/");
  }, [logout, router]);
}
