"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdateDto, UserUpdateDtoType } from "@server/user/user.dto";
import { CircularProgress } from "@web/components/CircularProgress";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { useUserContext } from "../user/UserContext";

export default function Profile() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const { setAccessToken } = useUserContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<UserUpdateDtoType>({
    resolver: zodResolver(UserUpdateDto),
    defaultValues: {
      id: currentUser?.id || 0,
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      username:
        currentUser?.username ||
        `${currentUser?.firstName} ${currentUser?.lastName}`,
      phone: currentUser?.phone || "",
    },
  });
  const userUpdate = trpc.userRouter.update.useMutation();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md border border-gray-200 p-12 rounded-xl">
          <h2 className="text-center text-2xl leading-9 tracking-tight text-gray-900">
            My Profile
          </h2>
          <p className="mt-6 text-center text-gray-500">
            Update my profile information
          </p>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(async (data) => {
                const res = await userUpdate.mutateAsync(data);
                if (res) {
                  alert("Profile updated");
                  window.location.href = "/";
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
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block px-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      {...register("username")}
                      type="text"
                      placeholder="april dream"
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
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block px-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <PhoneInput
                      country="US"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                      value={getValues("phone")}
                      onChange={(value) => setValue("phone", value)}
                      maxLength={14}
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  style={{
                    backgroundColor: "#00CA5A",
                  }}
                >
                  Save Profile
                </button>
                {userUpdate.isLoading && (
                  <div className="mt-4 justify-center flex">
                    <CircularProgress />
                  </div>
                )}
              </div>
            </form>
            {userUpdate.error && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {userUpdate.error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
