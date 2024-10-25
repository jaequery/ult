"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginDtoType, UserResetPasswordDto } from "@server/user/user.dto";
import { CircularProgress } from "@web/components/preloaders/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-200 p-4 rounded-xl">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-6 text-center text-gray-500">
            Find your password by email.
          </p>

          {resetPassword.data && (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
              Find your password by email.
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
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      {...register("email", { required: true })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    style={{
                      backgroundColor: "#00CA5A",
                    }}
                  >
                    Reset
                  </button>
                  {resetPassword.isLoading && (
                    <div className="mt-4 justify-center flex">
                      <CircularProgress />
                    </div>
                  )}
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
      </div>
    </>
  );
}
