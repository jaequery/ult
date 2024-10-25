"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PostReactionType } from "@prisma/client";
import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
import { format } from "date-fns";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import PostComments from "./PostComments";
import PostEditForm from "./PostEditForm";
import PostNewForm from "./PostNewForm";
import { useEffect } from "react";
import { getUsername } from "@server/post/post.dto";

export default function PostView() {
  const { trpc } = useTrpc();
  const { params } = useParams();
  const router = useRouter();
  const { currentUser } = useUserContext();
  const [categoryId, setCategoryId] = useQueryParam(
    "categoryId",
    withDefault(NumberParam, 0)
  );
  const id = params[0];
  const post = trpc.postRouter.findById.useQuery({ id: Number(id) });
  const createPostReaction = trpc.postRouter.createReaction.useMutation({});

  useEffect(() => {
    if (post?.data?.categoryId && post?.data?.categoryId !== categoryId) {
      setCategoryId(post?.data?.categoryId);
    }
  }, [post, setCategoryId, categoryId]);

  if (id === "new") {
    return <PostNewForm categoryId={categoryId} />;
  } else if (params[1] === "edit" && post?.data) {
    return <PostEditForm post={post.data} />;
  }

  return (
    <div className="w-128">
      <div className="flex items-center justify-between">
        <h3 className="text-lg mb-2">
          <div className="flex items-center">
            <Link
              className="flex items-center gap-2 text-red-500 whitespace-nowrap mr-2"
              href={`/posts/?category=${post?.data?.category?.name}&categoryId=${post?.data?.categoryId ?? categoryId}`}
            >
              <span>[{post?.data?.category?.name}]</span>
              <ChevronRightIcon style={{ height: 20, width: 20 }} />
            </Link>
            <span className="break-words">{post?.data?.title}</span>
          </div>
        </h3>
      </div>
      {post.isLoading ? (
        <div className="flex animate-pulse bg-white border-gray-300">
          <div className="flex-shrink-0">
            <span className="size-12 block bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="ms-4 mt-2 w-full">
            <h3
              className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"
              style={{ width: "40%" }}
            />
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full border-t border-orange-200">
          <div className="mx-auto">
            <div className="max-w-full mt-4">
              {/* Avatar Media */}
              <div className="flex justify-between mb-6">
                <div className="flex w-full sm:items- gap-x-5 sm:gap-x-3">
                  {/* <div className="flex-shrink-0">
                    <img
                      className="size-12 rounded-full"
                      src={post?.data?.user?.profilePicUrl || ""}
                      alt="Image Description"
                    />
                  </div> */}
                  <div className="grow">
                    <div className="flex justify-between items-center gap-x-2 text-left">
                      <div>
                        <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                          <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                            <span className="font-semibold text-gray-800 dark:text-gray-200 text-left">
                              {getUsername(post?.data?.user)}
                            </span>
                            {/* Dropdown Card */}

                            {/* End Dropdown Card */}
                          </div>
                        </div>
                        {/* End Tooltip */}
                        <ul className="text-xs text-gray-500">
                          <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            {post?.data?.createdAt &&
                              format(
                                post?.data?.createdAt,
                                "yyyy.MM.dd hh:mm a"
                              )}
                          </li>
                          <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            {`${post?.data?.viewCount} views`}
                            {/* {calculateReadingTime(
                              post?.data?.description || ""
                            )} */}
                          </li>
                        </ul>
                      </div>
                      {/* Button Group */}
                      <div>
                        {(post?.data?.user?.id === currentUser?.id ||
                          currentUser?.roles?.some(
                            (role) => role.name === "Admin"
                          )) && (
                          <button
                            onClick={() => {
                              router.push(`/posts/${id}/edit`);
                            }}
                            type="button"
                            className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            Edit
                          </button>
                        )}
                      </div>
                      {/* End Button Group */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End Avatar Media */}
              {/* Content */}
              <div className="space-y-5 md:space-y-8 mt-2">
                <div className="space-y-3">
                  {post?.data?.imageUrl && (
                    <div className="pb-8 transition-transform duration-300 hover:scale-110 w-full h-full flex items-center justify-center">
                      <Link href={post?.data?.imageUrl} target="_blank">
                        <img
                          src={post?.data?.imageUrl}
                          alt="Image Description"
                        />
                      </Link>
                    </div>
                  )}
                  <div
                    className="text-md text-gray-700 whitespace-pre-line text-left leading-loose"
                    dangerouslySetInnerHTML={{
                      __html: post?.data?.description || "",
                    }}
                  />
                </div>
              </div>
              {/* End Content */}
            </div>
          </div>
          {/* End Blog Article */}
          {/* Sticky Share Group */}
          <div className="inset-x-0 text-center mt-8">
            <div className="inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800">
              <div className="flex items-center gap-x-1.5">
                {/* Button */}
                <div className="hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={async () => {
                      if (!currentUser) {
                        alert("Please login to like this post");
                        return;
                      }
                      await createPostReaction.mutateAsync({
                        type: PostReactionType.like,
                        postId: post?.data?.id || 0,
                      });
                      await post.refetch();
                    }}
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill={
                        post?.data?.postReactions?.some(
                          (postReaction) =>
                            postReaction.userId === currentUser?.id
                        )
                          ? "red"
                          : "none"
                      }
                      stroke={
                        post?.data?.postReactions?.some(
                          (postReaction) =>
                            postReaction.userId === currentUser?.id
                        )
                          ? "red"
                          : "currentColor"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    {post?.data?.postReactions?.length}
                  </button>
                </div>
                {/* Button */}
                <div className="hidden block h-3 border-e border-gray-300 mx-3 dark:border-gray-600" />
                {/* Button */}
                <div className="hidden hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                    {post?.data?.postComments?.length}
                  </button>
                </div>
                {/* Button */}
              </div>
            </div>
          </div>
        </div>
      )}
      {post?.data && (
        <div className="mt-4">
          <PostComments
            post={post.data}
            onChange={() => {
              post.refetch();
              toast.success("Comment added");
            }}
          />
        </div>
      )}
    </div>
  );
}

function calculateReadingTime(text: string) {
  const wordsPerMinute = 225;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime === 1
    ? `${readingTime} 분 소요`
    : `${readingTime} 분 쇼요`;
}
