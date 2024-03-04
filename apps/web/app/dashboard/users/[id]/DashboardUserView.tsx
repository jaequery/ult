"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdateDto, UserUpdateDtoType } from "@server/user/dto/user.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function DashboardUserView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const user = trpc.userRouter.findById.useQuery({ id: +params.id });
  const updateUser = trpc.userRouter.update.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserUpdateDtoType>({
    resolver: zodResolver(UserUpdateDto),
  });

  // set default form values
  useEffect(() => {
    if (user.data) {
      const formData = {
        id: user.data.id,
        email: user.data.email,
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        password: "",
        phone: user.data.phone || "",
        gender: user.data.gender || "",
        bio: user.data.bio || "",
        profilePicUrl: user.data.profilePicUrl || "",
      };
      reset(formData);
    }
  }, [user.data, reset]);

  return (
    <div className="">
      {/* Card Section */}

      {/* Card */}
      <div className="bg-white rounded-xl  sm:p-7 dark:bg-slate-900">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {_.capitalize(user?.data?.firstName || "")}{" "}
            {_.capitalize(user?.data?.lastName || "")}'s Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            * means required
          </p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            await updateUser.mutateAsync(data);
            toast("Saved");
          })}
        >
          {/* Grid */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Profile photo
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                <img
                  className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={
                    user?.data?.profilePicUrl ||
                    "https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=PastelRed&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=FlatNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Auburn&hatColor=PastelGreen&mouthType=Serious&skinColor=Light&topType=ShortHairFrizzle"
                  }
                  alt="Image Description"
                />
                <div className="flex gap-x-2">
                  <div>
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1={12} x2={12} y1={3} y2={15} />
                      </svg>
                      Upload photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Full name
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                *
              </span>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  type="text"
                  {...register("firstName")}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Maria"
                />
                <input
                  type="text"
                  {...register("lastName")}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Boone"
                />
              </div>
              {errors.firstName && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
              {errors.lastName && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Email
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                *
              </span>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="email"
                {...register("email")}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
              />
              {errors.email && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Password
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="space-y-2">
                {showChangePassword ? (
                  <input
                    type="text"
                    {...register("password")}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Enter new password"
                  />
                ) : (
                  <a
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      setShowChangePassword(true);
                    }}
                  >
                    <small className="text-underline px-2 text-orange-600">
                      Click here to change password
                    </small>
                  </a>
                )}
                {errors.password && (
                  <p className="mt-2 pl-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <div className="inline-block">
                <label
                  htmlFor="af-account-phone"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Phone
                </label>
              </div>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  type="text"
                  {...register("phone")}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="+x(xxx)xxx-xx-xx"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-gender-checkbox"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Gender
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <select
                  {...register("gender")}
                  className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-bio"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                BIO
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <textarea
                {...register("bio")}
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                rows={6}
                placeholder="Type your message..."
                defaultValue={""}
              />
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
          <div className="mt-5 flex justify-center gap-x-2">
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}