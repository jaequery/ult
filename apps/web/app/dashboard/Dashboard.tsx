"use client";

import { Roles } from "@shared/interfaces";
import WithAuth from "@web/components/WithAuth";
import _ from "lodash";
import { useUserContext } from "../user/UserContext";

const Dashboard = () => {
  const { currentUser } = useUserContext();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-center justify-center px-6 py-12 lg:px-8">
        Welcome to dashboard, {_.startCase(currentUser?.firstName || "")}!
      </div>
    </>
  );
};

export default WithAuth(Dashboard, [Roles.Admin, Roles.User]);
