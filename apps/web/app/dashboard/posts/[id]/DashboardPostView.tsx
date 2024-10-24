"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostUpdateDto, PostUpdateDtoType } from "@server/post/post.dto";
import { Uploader } from "@web/components/Uploader";
import { useTrpc } from "@web/contexts/TrpcContext";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function DashboardPostView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const router = useRouter();
  const categories = trpc.categoryRouter.findAll.useQuery({});
  const deletePost = trpc.postRouter.delete.useMutation();
  const post = trpc.postRouter.findById.useQuery(
    { id: Number(params.id) },
    { refetchOnWindowFocus: false }
  );
  const updatePost = trpc.postRouter.update.useMutation();
  const [showImageUrlUploader, setShowImageUrlUploader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
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
        categoryId: post.data.categoryId || 0,
        teaser: post.data.teaser || "",
        description: post.data.description || "",
        imageUrl: post.data.imageUrl || "",
      };
      reset(formData);
    }
  }, [post.data, reset]);

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
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Cover image
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                {data?.imageUrl && (
                  <a href={data?.imageUrl} target="_blank">
                    <img
                      className="inline-block size-16 ring-2 ring-white dark:ring-gray-800"
                      src={data?.imageUrl}
                      alt="Image"
                    />
                  </a>
                )}
                <div className="flex gap-x-2">
                  <div>
                    <button
                      id="profilePicUrl"
                      type="button"
                      onClick={() => {
                        setShowImageUrlUploader(!showImageUrlUploader);
                      }}
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
                    {showImageUrlUploader && (
                      <Uploader
                        onClose={() => {
                          setShowImageUrlUploader(false);
                        }}
                        onUpload={(file) => {}}
                        onComplete={(file) => {
                          console.log("completed file", file);
                          setValue("imageUrl", file.url);
                          setShowImageUrlUploader(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* End Col */}
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
            <div className="sm:col-span-9">
              <input
                type="text"
                {...register("title")}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
              />
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
                Category
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600">
                *
              </span>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <select
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    {...field}
                    onChange={(e) => {
                      // Convert the string value to a number before passing it to the field.onChange
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? "" : value); // Handle potential NaN values gracefully
                    }}
                  >
                    {categories?.data?.records?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.categoryId && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            {/* End Col */}
            {/* <div className="sm:col-span-3">
              <label
                htmlFor="teaser"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Teaser
              </label>
            </div> */}
            {/* End Col */}
            {/* <div className="sm:col-span-9">
              <div className="space-y-2">
                <textarea
                  {...register("teaser")}
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  rows={2}
                  placeholder="A short teaser of your blog post..."
                  defaultValue={""}
                />
                {errors.teaser && (
                  <p className="mt-2 pl-2 text-sm text-red-600"></p>
                )}
              </div>
            </div> */}
            {/* End Col */}
            <div className="sm:col-span-3">
              <label
                htmlFor="af-description"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Description
              </label>
            </div>
            {/* End Col */}
            <div className="sm:col-span-9">
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
          <div className="mt-5 flex gap-x-2 justify-between">
            <button
              className="text-red-500 font-bold text-xs "
              data-id={20}
              type="submit"
              disabled={deletePost.isLoading}
              onClick={async (e) => {
                e.preventDefault();
                if (post?.data?.id) {
                  const c = confirm("Are you sure?");
                  if (c) {
                    await deletePost.mutateAsync({
                      id: [post.data.id],
                    });
                    router.push(`/dashboard/posts`);
                  }
                }
              }}
            >
              삭재
            </button>
            <button
              type="submit"
              disabled={updatePost.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {updatePost.isLoading ? "Saving ..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
