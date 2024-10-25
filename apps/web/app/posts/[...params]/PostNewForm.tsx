"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateDto, PostCreateDtoType } from "@server/post/post.dto";
import { PostById } from "@shared/interfaces";
import { Uploader } from "@web/components/forms/Uploader";
import { useTrpc } from "@web/contexts/TrpcContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Dynamically import Quill with SSR disabled
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostNewForm({
  categoryId,
}: {
  post?: PostById;
  categoryId?: number;
}) {
  const router = useRouter();
  const { trpc } = useTrpc();
  const [showImageUrlUploader, setShowImageUrlUploader] = useState(false);
  const createPost = trpc.postRouter.create.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<PostCreateDtoType>({
    resolver: zodResolver(PostCreateDto),
  });

  useEffect(() => {
    if (createPost.data) {
      router.push(`/posts/${createPost.data.id}/?categoryId=${categoryId}`);
      reset();
    }
  }, [categoryId, createPost.data, reset, router]);

  useEffect(() => {
    if (createPost.error) {
      alert(createPost.error.message);
    }
  }, [createPost.error]);

  const category = trpc.categoryRouter.findById.useQuery({
    id: categoryId || 0,
  });

  return (
    <div className="">
      <form
        onSubmit={handleSubmit((data) => {
          createPost.mutate(data);
        })}
      >
        <input
          type="hidden"
          value={categoryId}
          {...register("categoryId", { valueAsNumber: true })}
        />
        <div className="flex items-center justify-between">
          <h3 className="text-lg mb-2 flex items-center">
            <Link
              className="flex items-center gap-2 text-red-500"
              href={`/posts/?category=${category?.data?.name}&categoryId=${category?.data?.id ?? categoryId}`}
            >
              <span>[{category?.data?.name}]</span>
            </Link>
          </h3>
        </div>
        <div
          className="w-full border-t border-orange-200"
          data-id={1}
          data-v0-t="card"
        >
          <p className="text-gray-600 mt-8 text-xl ">Write a new post</p>
          <div className="pt-4 grid gap-4" data-id={5}>
            <div className="grid gap-1.5" data-id={6}>
              {/* <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title-3"
                data-id={7}
              >
                제목
              </label> */}
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="title-3"
                placeholder="Enter a title"
                data-id={8}
                type="text"
                {...register("title")}
              />
            </div>
            <div className="grid gap-1.5 mb-10" data-id={9}>
              <ReactQuill
                value={""}
                onChange={(value: string) => {
                  setValue("description", value);
                }}
              />
            </div>
            <div className="grid gap-1.5 mb-6" data-id={6}>
              <div>
                {getValues("imageUrl") && (
                  <img
                    className="w-64"
                    alt="image"
                    src={getValues("imageUrl")}
                  />
                )}
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
                  Upload a photo
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
          <div className="flex items-center w-full">
            <button
              className="bg-green-500 text-white px-4 w-1/4 py-2 rounded-full shadow-lg hover:bg-green-600 mt-2"
              data-id={20}
              type="submit"
              disabled={createPost.isLoading}
            >
              Write
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
