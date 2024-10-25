"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginDto, UserLoginDtoType } from "@server/user/user.dto";
import { CircularProgress } from "@web/components/common/preloaders/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserContext } from "../user/UserContext";

export default function Login() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLoginDtoType>({
    resolver: zodResolver(UserLoginDto),
  });
  const loginUser = trpc.userRouter.login.useMutation();
  const { currentUser, setCurrentUser, setAccessToken } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      window.location.href = "/";
    }
  }, [currentUser, router]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md border border-gray-200 p-4 rounded-xl">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login 🚀
          </h2>
          <p className="mt-6 text-center text-gray-500">
          You can access the following after logging in.
          </p>
          {/* <p className="mt-4 text-center">Demo: admin@example.com / password</p> */}

          <div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Sign In</span>
              </a>
            </div>
            <div className="relative mt-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or sign in with
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => {
                try {
                  const userJwt = await loginUser.mutateAsync(data);
                  if (userJwt.user && setCurrentUser) {
                    setAccessToken(
                      userJwt.jwt.accessToken,
                      userJwt.jwt.expiresIn
                    );
                    setCurrentUser(userJwt.user);
                  }
                } catch (e) {
                  toast("There was a problem during login", { type: "error" });
                }
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
                    required
                    {...register("email", { required: true })}
                    placeholder="admin@example.com"
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
                    placeholder="enter your password"
                    required
                    {...register("password", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  disabled={loginUser.isLoading}
                  style={{
                    backgroundColor: "#00CA5A",
                  }}
                >
                  Login
                </button>
                {loginUser.isLoading && (
                  <div className="mt-4 justify-center flex">
                    <CircularProgress />
                  </div>
                )}
              </div>
            </form>
            {loginUser.error && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {loginUser.error.message}
              </p>
            )}
            <p className="mt-8 text-center text-sm text-gray-700">
              <Link
                href="/signup"
                className=" leading-6 text-gray-900 text-underline hover:text-gray-500"
              >
                Sign Up
              </Link>
              <span className="px-6">|</span>
              <Link
                href="/forgot-password"
                className="leading-6 text-underline text-gray-900 hover:text-gray-500"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
