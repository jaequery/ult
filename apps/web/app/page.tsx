"use client";

import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "./trpc";
import { useTrpcMutate } from "@web/hooks/useTrpcMutate";
import { CreateUserDto } from "../../server/src/user/dto/create-user.dto";
import { z } from "zod";

export default function Home() {
  const [userId, setUserId] = useState<number>();

  const {
    query: getUser,
    data: user,
    isLoading: userLoading,
    error: userLoadingError,
  } = useTrpcQuery(
    useCallback(
      () =>
        trpc.userRouter.findOne.query({
          id: userId || 0,
        }),
      [userId]
    )
  );

  const {
    mutate: createUser,
    data: createdUser,
    isLoading: creatingUser,
    error: creatingUserError,
  } = useTrpcMutate(async (userData: z.infer<typeof CreateUserDto>) =>
    trpc.userRouter.create.mutate(userData)
  );

  const {
    query: getUsers,
    data: users,
    isLoading: usersLoading,
    error: usersLoadingError,
  } = useTrpcQuery(useCallback(() => trpc.userRouter.findAll.query({}), []));

  if (usersLoadingError) {
    return <>here was error{usersLoadingError.message}</>;
  }
  if (usersLoading) {
    return <>its loading ...</>;
  }

  return (
    <div>
      all users {JSON.stringify(users)}
      <hr />
      one user {JSON.stringify(user)}
      <hr />
      created user {JSON.stringify(createdUser)}
      <hr />
      <div>
        Create a user click me{" "}
        <input
          type="text"
          onChange={(event) => {
            setUserId(+event.target.value);
          }}
        />
        <button
          onClick={() => {
            createUser({
              email: "jae@jj.com",
              firstName: "john",
              lastName: "cena",
            });
          }}
        >
          create
        </button>
      </div>
    </div>
  );
}
