"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostUpdateDto, PostUpdateDtoType } from "@server/post/post.dto";
import { PostById } from "@shared/interfaces";
import { Uploader } from "@web/components/forms/Uploader";
import { useTrpc } from "@web/contexts/TrpcContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Dynamically import Quill with SSR disabled
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostEditForm({ post }: { post: PostById }) {
  const router = useRouter();
  const { trpc } = useTrpc();
  const [showImageUrlUploader, setShowImageUrlUploader] = useState(false);
  const updatePost = trpc.postRouter.update.useMutation();
  const deletePost = trpc.postRouter.delete.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<PostUpdateDtoType>({
    resolver: zodResolver(PostUpdateDto),
    defaultValues: {
      id: post?.id,
      title: post?.title,
      description: post?.description || "",
      categoryId: post?.categoryId || 0,
      imageUrl: post?.imageUrl || "",
    },
  });
  const data = getValues(); // Gets all current form values

  return (
    <div className="px-2">
      <form
        onSubmit={handleSubmit(async (data) => {
          await updatePost.mutateAsync(data);
          router.push(
            `/posts/${post?.id}/?category=${post?.category?.name}&categoryId=${post?.categoryId}`
          );
          reset();
        })}
      >
        <div className="bg-white">
          <h3 className="text-lg mb-4">
            <Link
              className="flex items-center gap-2  text-red-400"
              href={`/posts/${post?.id}?category=${post?.category?.name}&categoryId=${post?.categoryId}`}
            >
              <ChevronLeftIcon style={{ height: 20 }} /> Go Back
            </Link>
          </h3>
        </div>
        <div className=" rounded-lg border w-full" data-id={1} data-v0-t="card">
          <div className="p-6 grid gap-4" data-id={5}>
            <div className="grid gap-1.5" data-id={6}>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title-3"
                data-id={7}
              >
                Title
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="title-3"
                placeholder="Enter the title of your post."
                data-id={8}
                type="text"
                {...register("title")}
              />
            </div>
            <div className="grid gap-1.5 mb-12" data-id={9}>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="message-3"
                data-id={10}
              >
                Message
              </label>
              <ReactQuill
                value={data?.description || ""}
                onChange={(value: string) => {
                  setValue("description", value);
                }}
              />
            </div>

            <div className="grid gap-1.5" data-id={6}>
              <div>
                {getValues("imageUrl") && (
                  <img
                    className="w-64 mb-4"
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
                  사진 업로드
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
          <div className="flex justify-between items-center p-6 mt-8">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full w-1/4 shadow-lg hover:bg-red-600 mt-2"
              data-id={20}
              type="submit"
              disabled={updatePost.isLoading}
            >
              수정
            </button>
            <button
              className="text-red-500 font-bold text-xs "
              data-id={20}
              type="submit"
              disabled={deletePost.isLoading}
              onClick={async (e) => {
                e.preventDefault();
                if (post?.id) {
                  const c = confirm("Are you sure?");
                  if (c) {
                    await deletePost.mutateAsync({
                      id: [post.id],
                    });
                    router.push(
                      `/posts?category=${post?.category}&categoryId=${post?.categoryId}`
                    );
                  }
                }
              }}
            >
              삭재
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
