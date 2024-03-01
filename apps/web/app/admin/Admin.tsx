"use client";

import WithAuth from "@web/components/WithAuth";
import { useUserContext } from "../user/UserContext";
import { Roles } from "@shared/interfaces";

const Admin = () => {
  const { currentUser } = useUserContext();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-center justify-center px-6 py-12 lg:px-8">
        Welcome to admin, {currentUser?.firstName}!
      </div>
    </>
  );
};

export default WithAuth(Admin, [Roles.Admin]);
