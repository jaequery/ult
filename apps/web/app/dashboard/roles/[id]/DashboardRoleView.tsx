"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RoleUpdateDto, RoleUpdateDtoType } from "@server/role/role.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function DashboardRoleView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const role = trpc.roleRouter.findById.useQuery({ id: Number(params.id) });
  const updateRole = trpc.roleRouter.update.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<RoleUpdateDtoType>({
    resolver: zodResolver(RoleUpdateDto),
  });

  const data = getValues(); // Gets all current form values

  // set default form values
  useEffect(() => {
    if (role.data) {
      const formData = {
        id: role.data.id,
        name: role.data.name,
      };
      reset(formData);
    }
  }, [role.data, reset]);

  return (
    <div className="">
      {/* Card */}
      <div className="bg-white rounded-xl  sm:p-7 dark:bg-slate-900">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {data?.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            * means required
          </p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await updateRole.mutateAsync(data);
              toast("Saved");
            } catch (e: any) {
              toast(e.message, { type: "error" });
            }
          })}
        >
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Name
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                *
              </span>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="text"
                {...register("name")}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
              />
              {errors.name && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* End Col */}
          </div>

          {/* End Grid */}
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="submit"
              disabled={updateRole.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {updateRole.isLoading ? "Saving ..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
