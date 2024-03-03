"use client";

import { Roles } from "@shared/interfaces";
import WithAuth from "@web/components/WithAuth";
import { useUserContext } from "../user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";

const Dashboard = () => {
  const { currentUser } = useUserContext();
  const { trpc } = useTrpc();
  const user14 = trpc.userRouter.findById.useQuery({ id: 14 });
  const me = trpc.userRouter.findById.useQuery({ id: currentUser?.id || 0 });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-center justify-center px-6 py-12 lg:px-8">
        Welcome to dashboard, {currentUser?.firstName}!
      </div>
      Other user:
      {JSON.stringify(user14.data)}
      <div>
        me:
        {JSON.stringify(me.data)}
      </div>
    </>
  );
};

export default WithAuth(Dashboard, [Roles.Admin, Roles.User]);
