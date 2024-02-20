"use client";

import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
import { useCallback, useState } from "react";

import {
  UserCreateDtoType,
  UserFindAllDtoType,
  UserRemoveDtoType,
} from "@server/user/dto/user.dto";
import { trpc } from "@web/app/trpc";
import { useTrpcMutate } from "@web/hooks/useTrpcMutate";

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

  const {
    // mutate: createUser,
    mutateAsync: createUser,
    data: createdUser,
    isLoading: creatingUser,
    error: creatingUserError,
  } = useTrpcMutate(async (userData: UserCreateDtoType) =>
    trpc.userRouter.create.mutate(userData)
  );

  const {
    mutate: removeUser,
    // mutateAsync: createUser,
    data: removedUser,
    isLoading: removingUser,
    error: removingUserError,
  } = useTrpcMutate(async (userData: UserRemoveDtoType) =>
    trpc.userRouter.remove.mutate(userData)
  );

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
      {createdUser && <div>{JSON.stringify(createdUser)}</div>}
      <button
        onClick={async () => {
          const createdUser = await createUser({
            email: email || "jn@n.com",
            firstName: "john",
            lastName: "cena",
          });
          console.log("createdUserr", createdUser);

          await removeUser({ id: createdUser.id || 0 });
        }}
      >
        create
      </button>
    </>
  );
}
