"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryUpdateDto,
  CategoryUpdateDtoType,
} from "@server/category/category.dto";
import { Uploader } from "@web/components/forms/Uploader";
import { useTrpc } from "@web/contexts/TrpcContext";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function DashboardCategoryView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const category = trpc.categoryRouter.findById.useQuery({
    id: Number(params.id),
  });
  const updateCategory = trpc.categoryRouter.update.useMutation();
  const [showImageUrlUploader, setShowImageUrlUploader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm<CategoryUpdateDtoType>({
    resolver: zodResolver(CategoryUpdateDto),
  });

  const data = getValues(); // Gets all current form values

  // set default form values
  useEffect(() => {
    if (category.data) {
      const formData = {
        id: category.data.id,
        name: category.data.name,
        sortOrder: category.data.sortOrder || 0,
        parentId: category.data.parentId || 0,
        adminWriteOnly: category.data.adminWriteOnly,
        singlePostOnly: category.data.singlePostOnly,
      };
      reset(formData);
    }
  }, [category.data, reset]);

  // loading Quill this way due to SSR issues
  // https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="">
      {/* Card Section */}

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
              await updateCategory.mutateAsync(data);
              toast("Saved");
            } catch (e: any) {
              toast(e.message, { type: "error" });
            }
          })}
        >
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
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

            <div className="sm:col-span-3">
              <label
                htmlFor="sortOrder"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Sort Order
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>

            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="text"
                {...register("sortOrder", { valueAsNumber: true })}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
              />
              {errors.sortOrder && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.sortOrder.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="sortOrder"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Parent Category
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>

            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="text"
                {...register("parentId", { valueAsNumber: true })}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
              {errors.sortOrder && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.sortOrder.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="sortOrder"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Admin Write Only
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>

            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="checkbox"
                {...register("adminWriteOnly")}
                className=""
              />
              {errors.adminWriteOnly && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.adminWriteOnly.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="sortOrder"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Single Post Only
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>

            {/* End Col */}
            <div className="sm:col-span-9">
              <input
                type="checkbox"
                {...register("singlePostOnly")}
                className=""
              />
              {errors.singlePostOnly && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.singlePostOnly.message}
                </p>
              )}
            </div>
          </div>

          {/* End Grid */}
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="submit"
              disabled={updateCategory.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {updateCategory.isLoading ? "Saving ..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
