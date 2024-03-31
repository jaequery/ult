"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateDto, PostCreateDtoType } from "@server/post/post.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import dynamic from "next/dynamic";

// Dynamically import Quill with SSR disabled
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostForm() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const [category, setCategory] = useQueryParam(
    "category",
    withDefault(StringParam, "All")
  );
  const createPost = trpc.postRouter.create.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<PostCreateDtoType>({
    resolver: zodResolver(PostCreateDto),
  });
  useEffect(() => {
    if (createPost.data) {
      router.push(`/posts/${createPost.data.id}`);
      reset();
    }
  }, [createPost.data, reset, router]);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          createPost.mutate(data);
        })}
      >
        <input type="hidden" value={category} {...register("category")} />
        <div className="bg-white px-6 py-4 mt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create a new post
          </h1>
          <p className="text-gray-600 mb-4 text-xl">
            Fill in the form below to create a new post.
          </p>
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
            <div className="grid gap-1.5" data-id={9}>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="message-3"
                data-id={10}
              >
                Message
              </label>
              <ReactQuill
                value={""}
                onChange={(value: string) => {
                  setValue("description", value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center p-6 mt-8">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 mt-2"
              data-id={20}
            >
              Create Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
