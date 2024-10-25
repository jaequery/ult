"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  MagazineUpdateDto,
  MagazineUpdateDtoType,
} from "@server/magazine/magazine.dto";
import { CircularProgress } from "@web/components/preloaders/CircularProgress";
import { Uploader } from "@web/components/forms/Uploader";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

interface BlogPost {
  id: number;
  categoryId: string;
  category: string;
  title: string;
  summary: string;
  description: string;
}

export default function DashboardMagazineView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const createPost = trpc.postRouter.create.useMutation();
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: magazineData } = trpc.magazineRouter.findById.useQuery({
    id: Number(params.id),
  });
  const updateMagazine = trpc.magazineRouter.update.useMutation();
  const [showThumbnailUrlUploader, setShowThumbnailUrlUploader] =
    useState(false);
  const [showPdfFileUrlUploader, setShowPdfFileUrlUploader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
    resetField,
    control,
  } = useForm<MagazineUpdateDtoType>({
    resolver: zodResolver(MagazineUpdateDto),
  });
  const sourcePdf = trpc.magazineRouter.sourcePdf.useMutation();

  const data = getValues(); // Gets all current form values

  // Initialize form values when magazineData is available
  useEffect(() => {
    if (magazineData && !isInitialized) {
      reset({
        id: magazineData.id,
        name: magazineData.name || "",
        month: magazineData.month || 0,
        year: magazineData.year || 0,
        pdfFileUrl: magazineData.pdfFileUrl || "",
        thumbnailUrl: magazineData.thumbnailUrl || "",
      });
      setIsInitialized(true); // Prevent further resets
    }
  }, [magazineData, reset, isInitialized]);

  return (
    <div className="">
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
              await updateMagazine.mutateAsync(data);
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
                placeholder="8월 밸리 매개진"
              />
              {errors.name && (
                <p className="mt-2 pl-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="month"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Edition Date
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>

            {/* End Col */}
            <div className="sm:col-span-9">
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register("month", { valueAsNumber: true })}
                  className="w-12 border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="12"
                />
                {errors.month && (
                  <p className="mt-2 pl-2 text-sm text-red-600">
                    {errors.month.message}
                  </p>
                )}
                <input
                  type="text"
                  {...register("year", { valueAsNumber: true })}
                  className="w-24 border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="2024"
                />
                {errors.year && (
                  <p className="mt-2 pl-2 text-sm text-red-600">
                    {errors.year.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="thumbnailUrl"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Thumbnail File
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>
            <div className="sm:col-span-9">
              <div className="flex gap-4 ">
                <button
                  id="thumbnailUrl"
                  type="button"
                  onClick={() => {
                    setShowThumbnailUrlUploader(!showThumbnailUrlUploader);
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
                  Upload Thumbnail
                </button>
                {data?.thumbnailUrl && (
                  <div className="">
                    <Link
                      href={data?.thumbnailUrl}
                      target="_blank"
                      className="text-orange-500 text-sm"
                    >
                      <img
                        className="w-16"
                        src={data?.thumbnailUrl}
                        alt="Thumbnail"
                      />
                    </Link>
                  </div>
                )}
              </div>
              {showThumbnailUrlUploader && (
                <Uploader
                  onClose={() => {
                    setShowThumbnailUrlUploader(false);
                  }}
                  onUpload={(file) => {}}
                  onComplete={(file) => {
                    console.log("completed thumbnail", file);
                    setValue("thumbnailUrl", file.url);
                    setShowThumbnailUrlUploader(false);
                  }}
                />
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="fileUrl"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                PDF File
              </label>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-600"></span>
            </div>
            <div className="sm:col-span-9">
              <div className="flex gap-4 items-center">
                <button
                  id="pdfFileUrl"
                  type="button"
                  onClick={() => {
                    setShowPdfFileUrlUploader(!showPdfFileUrlUploader);
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
                  Upload PDF File
                </button>
                {data?.pdfFileUrl && (
                  <div className="flex gap-4">
                    <Link
                      href={data?.pdfFileUrl}
                      target="_blank"
                      className="text-orange-500 text-sm"
                    >
                      Download
                    </Link>
                  </div>
                )}
              </div>
              {showPdfFileUrlUploader && (
                <Uploader
                  onClose={() => {
                    setShowPdfFileUrlUploader(false);
                  }}
                  onUpload={(file) => {}}
                  onComplete={(file) => {
                    console.log("completed file", file);
                    setValue("pdfFileUrl", file.url);
                    setShowPdfFileUrlUploader(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* End Grid */}
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              onClick={async (e) => {
                e.preventDefault();
                sourcePdf.mutate({
                  magazineId: Number(params.id),
                });
              }}
              disabled={sourcePdf.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Source PDF
            </button>
            <button
              type="submit"
              disabled={updateMagazine.isLoading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {updateMagazine.isLoading ? "Saving ..." : "Save"}
            </button>
          </div>

          <div>
            {sourcePdf.isLoading && <CircularProgress />}
            <>
              {sourcePdf.data && <p>Sourced from PDF</p>}
              {(magazineData?.extractedPosts || sourcePdf.data)?.map(
                (post: BlogPost, index: number) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden mb-4"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded"
                          disabled={createPost.isLoading}
                          onClick={async (e) => {
                            e.preventDefault();
                            if (typeof post.categoryId === "string") {
                              alert("category is not int");
                              return;
                            }
                            if (post.categoryId > 100) {
                              alert("category is not correct");
                              return;
                            }
                            const postRes = await createPost.mutateAsync({
                              title: post.title,
                              description: post.description,
                              categoryId: Number(post.categoryId),
                            });
                            if (postRes) {
                              toast("Added to blog");
                            }
                          }}
                        >
                          Add to blog
                        </button>
                      </div>
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <p className="text-sm font-semibold mb-2 text-gray-600">
                        {post.summary}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </>
          </div>
        </form>
      </div>
    </div>
  );
}
