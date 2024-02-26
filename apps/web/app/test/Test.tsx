// "use client";

// import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
// import { useCallback, useState } from "react";

// import {
//   UserCreateDtoType,
//   UserFindAllDtoType,
//   UserRemoveDtoType,
// } from "@server/user/dto/user.dto";
// import { trpc } from "@web/utils/trpc/trpc";
// import { useTrpcMutate } from "@web/hooks/useTrpcMutate";

// export default function Test() {
//   const [email, setEmail] = useState<string>("");
//   const {
//     query: getUsers,
//     data: users,
//     isLoading: gettingUsers,
//     error: gettingUsersError,
//   } = useTrpcQuery(
//     useCallback(
//       (opts: UserFindAllDtoType) => trpc.userRouter.findAll.query(opts),
//       []
//     ),
//     false
//   );

//   const {
//     // mutate: createUser,
//     mutateAsync: createUser,
//     data: createdUser,
//     isLoading: creatingUser,
//     error: creatingUserError,
//   } = useTrpcMutate(async (userData: UserCreateDtoType) =>
//     trpc.userRouter.create.mutate(userData)
//   );

//   const {
//     mutate: removeUser,
//     data: removedUser,
//     isLoading: removingUser,
//     error: removingUserError,
//   } = useTrpcMutate(async (userData: UserRemoveDtoType) =>
//     trpc.userRouter.remove.mutate(userData)
//   );

//   return (
//     <>
//       <div>{JSON.stringify(users)}</div>
//       by email:
//       <input
//         type="text"
//         value={email}
//         onChange={(e) => {
//           setEmail(e.target.value);
//           getUsers({
//             email,
//           });
//         }}
//       />
//       {createdUser && <div>{JSON.stringify(createdUser)}</div>}
//       <button
//         onClick={async () => {
//           const createdUser = await createUser({
//             email: email || "jn@ni.com",
//             password: "password",
//             firstName: "john",
//             lastName: "cena",
//           });
//           await removeUser({ id: createdUser.id || 0 });
//         }}
//       >
//         create
//       </button>
//     </>
//   );
// }
