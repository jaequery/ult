"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateDtoType, UserSignupDto } from "@server/user/dto/user.dto";
import { CircularProgress } from "@web/components/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../user/UserContext";

export default function Signup() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const { setAccessToken } = useUserContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserCreateDtoType>({
    resolver: zodResolver(UserSignupDto),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const userSignup = trpc.userRouter.signup.useMutation();
  useEffect(() => {
    if (userSignup?.data?.user) {
      router.push(`/verify-email`);
    }
  }, [userSignup, router]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign-up for a 14-day Free Trial
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(async (data) => {
              const { jwt } = await userSignup.mutateAsync(data);
              if (jwt) {
                setAccessToken(jwt.accessToken, jwt.expiresIn);
              }
            })}
            className="space-y-6"
          >
            <div className="flex space-between gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    {...register("firstName", { required: true })}
                    type="text"
                    required
                    className="input"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block px-2 text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    {...register("lastName", { required: true })}
                    type="text"
                    required
                    className="input"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
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
                  {...register("email", { required: true })}
                  type="email"
                  autoComplete="email"
                  required
                  className="input"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: true })}
                  type="password"
                  required
                  className="input"
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
                Sign Up
              </button>
              {userSignup.isLoading && <CircularProgress />}
            </div>
          </form>
          {userSignup.error && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {userSignup.error.message}
            </p>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
