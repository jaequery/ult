"use client";

import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
import { useCallback, useEffect, useState } from "react";

import { UserFindAllDtoType } from "@server/user/dto/user.dto";
import { trpc } from "@web/app/trpc";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const {
    query: getUsers,
    data: users,
    isLoading: usersLoading,
    error: usersLoadingError,
  } = useTrpcQuery(
    useCallback(
      (opts: UserFindAllDtoType) => trpc.userRouter.findAll.query(opts),
      []
    ),
    false
  );

  // const createUserMutation = trpc.userRouter.create.useMutation();

  // const {
  //   query: getUser,
  //   data: user,
  //   isLoading: userLoading,
  //   error: userLoadingError,
  // } = useTrpcQuery(
  //   useCallback(
  //     (userId: number) => trpc.userRouter.findOne.query({ id: userId }),
  //     []
  //   ),
  //   false
  // );

  // const {
  //   mutate: createUser,
  //   data: createdUser,
  //   isLoading: creatingUser,
  //   error: creatingUserError,
  // } = useTrpcMutate(async (userData: z.infer<typeof CreateUserDto>) =>
  //   trpc.userRouter.create.mutate(userData)
  // );

  // const {
  //   query: getUsers,
  //   data: users,
  //   isLoading: usersLoading,
  //   error: usersLoadingError,
  // } = useTrpcQuery(
  //   useCallback(
  //     (opts: { email: string; password?: string }) =>
  //       trpc.userRouter.findAll.query(opts),
  //     []
  //   )
  // );

  // useEffect(() => {
  //   if (createdUser) {
  //     getUser(createdUser.id);
  //   }
  // }, [createdUser, getUser, getUsers]);

  // if (usersLoadingError) {
  //   return <>here was error{usersLoadingError.message}</>;
  // }
  // if (usersLoading) {
  //   return <>its loading ...</>;
  // }

  return (
    <>
      <div>{JSON.stringify(users)}</div>
      by email:
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          getUsers({
            email,
          });
        }}
      />
      <button
        onClick={() => {
          // createUser({
          //   email: email || "jn@n.com",
          //   firstName: "john",
          //   lastName: "cena",
          // });
        }}
      >
        create
      </button>
    </>
  );
}
