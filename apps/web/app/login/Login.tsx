"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginDto, UserLoginDtoType } from "@server/user/dto/user.dto";
import { CircularProgress } from "@web/components/CircularProgress";
import { useTrpcMutate } from "@web/hooks/useTrpcMutate";
import { useTrpcQuery } from "@web/hooks/useTrpcQuery";
import { getJwtAccessToken, setJwtAccessToken } from "@web/utils/auth";
import { trpc } from "@web/utils/trpc/trpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../user/UserContext";

export default function Login() {
  const router = useRouter();
  const {
    mutateAsync: loginUser,
    data: user,
    isLoading: loggingInUser,
    error: loggingInUserError,
  } = useTrpcMutate(async (userData: UserLoginDtoType) =>
    trpc.userRouter.login.mutate(userData)
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLoginDtoType>({
    resolver: zodResolver(UserLoginDto),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const { currentUser, setCurrentUser } = useUserContext();
  const jwtAccessToken = getJwtAccessToken();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(async (data) => {
              try {
                const jwtUser = await loginUser(data);
                if (jwtUser?.user && setCurrentUser) {
                  setCurrentUser(jwtUser.user);
                }
                setJwtAccessToken(
                  jwtUser.jwt.accessToken,
                  jwtUser.jwt.expiryDays
                );
                router.push("/dashboard");
              } catch (e) {}
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              {loggingInUser && <CircularProgress />}
            </div>
          </form>
          {loggingInUserError && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {loggingInUserError.message}
            </p>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
