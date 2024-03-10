"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostUpdateDto, PostUpdateDtoType } from "@server/post/post.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function DashboardPostView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const post = trpc.postRouter.findById.useQuery({ id: Number(params.id) });
  const updatePost = trpc.postRouter.update.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm<PostUpdateDtoType>({
    resolver: zodResolver(PostUpdateDto),
  });

  const data = getValues(); // Gets all current form values

  // set default form values
  useEffect(() => {
    if (post.data) {
      const formData = {
        id: post.data.id,
        title: post.data.title,
        teaser: post.data.teaser || "",
        description: post.data.description || "",
      };
      reset(formData);
    }
  }, [post.data]);

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
            {data?.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            * means required
          </p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await updatePost.mutateAsync(data);
              toast("Saved");
            } catch (e: any) {
              toast(e.message, { type: "error" });
            }
          })}
        >
          {/* Grid */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Title
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                *
              </span>
            </div>
            {/* End Col */}
            <div className="sm:col-span-12">
              <div className="sm:flex">
                <input
                  type="text"
                  {...register("title")}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Title of the post"
                />
              </div>
              {errors.title && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Teaser
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                (a short teaser of your blog post)
              </span>
            </div>
            <div className="sm:col-span-12">
              <div className="sm:flex">
                <textarea
                  {...register("teaser")}
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  rows={2}
                  placeholder="A short teaser of your blog post..."
                  defaultValue={""}
                />
              </div>
              {errors.teaser && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.teaser.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Content
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                (full content of the blog post)
              </span>
            </div>
            <div className="sm:col-span-12">
              <ReactQuill
                value={data.description}
                onChange={(value: string) => {
                  setValue("description", value);
                }}
              />
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="submit"
              disabled={updatePost.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {updatePost.isLoading ? "Saving ..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
