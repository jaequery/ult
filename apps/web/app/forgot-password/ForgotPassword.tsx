"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserLoginDto,
  UserLoginDtoType,
  UserResetPasswordDto,
} from "@server/user/dto/user.dto";
import { Roles } from "@shared/interfaces";
import { CircularProgress } from "@web/components/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../user/UserContext";

export default function ForgotPassword() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLoginDtoType>({
    resolver: zodResolver(UserResetPasswordDto),
  });
  const resetPassword = trpc.userRouter.resetPassword.useMutation();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>
        {resetPassword.data && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
            Please check your email for the temporary password.
          </div>
        )}

        {!resetPassword.data && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => {
                try {
                  resetPassword.mutate(data);
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
                {resetPassword.isLoading && <CircularProgress />}
              </div>
            </form>
            {resetPassword.error && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {resetPassword.error.message}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
