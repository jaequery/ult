"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateDtoType, UserSignupDto } from "@server/user/user.dto";
import { CircularProgress } from "@web/components/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { useUserContext } from "../user/UserContext";

export default function Signup() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const { setAccessToken } = useUserContext();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = useForm<UserCreateDtoType>({
    resolver: zodResolver(UserSignupDto),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const userSignup = trpc.userRouter.signup.useMutation();
  useEffect(() => {
    if (userSignup?.data?.user) {
      router.push(`/verify-email`);
    }
  }, [userSignup, router]);
  useEffect(() => {
    if (currentUser) {
      router.push(`/dashboard`);
    }
  }, [currentUser, router]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md border border-gray-200 p-4 rounded-xl">
          <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
            회원가입 🤗
          </h2>
          <p className="mt-6 text-center text-gray-500">
            회원가입은 쉽습니다. 아래 양식을 작성하신 후 등록하세요.
          </p>

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
                <span className="text-sm font-semibold leading-6">Sign Up</span>
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
                  Or continue with
                </span>
              </div>
            </div>
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
                      placeholder="John"
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
                      placeholder="Doe"
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
                    placeholder="john.doe@example.com"
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <PhoneInput
                    country="US"
                    className="border border-gray-300 w-full rounded-md p-2 text-sm"
                    maxLength={14}
                    value={getValues("phone")}
                    onChange={(value) => setValue("phone", value)}
                  />
                  {/* <input
                    id="phoneNumber"
                    {...register("phone")}
                    type="phone"
                    placeholder="323-123-5678"
                    className="input"
                  /> */}
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phone.message}
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
                    placeholder="••••••••"
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
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  disabled={userSignup.isLoading}
                  style={{
                    backgroundColor: "#00CA5A",
                  }}
                >
                  Sign Up
                </button>
                {userSignup.isLoading && (
                  <div className="mt-4 justify-center flex">
                    <CircularProgress />
                  </div>
                )}
              </div>
            </form>
            {userSignup.error && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {userSignup.error.message}
              </p>
            )}
            <p className="mt-8 text-center text-sm text-gray-700">
              이미 회원이신가요?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-gray-700 hover:text-gray-500"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
