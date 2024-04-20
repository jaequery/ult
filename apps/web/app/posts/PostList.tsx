"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { formatDistance } from "date-fns";
import kebabCase from "lodash/kebabCase";
import Link from "next/link";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import PostCategoryTabs from "./PostCategoryTabs";

export default function PostList() {
  const { trpc } = useTrpc();
  const [category, setCategory] = useQueryParam(
    "category",
    withDefault(StringParam, "All")
  );
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, 10)
  );
  const postList = trpc.postRouter.findAll.useQuery({
    page,
    perPage,
    category,
  });
  return (
    <>
      <div className="bg-white px-6 py-4 mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Board</h1>
        <p className="text-gray-600 mb-4 text-xl">
          Ask questions, find support, and connect with the community.
        </p>
        <Link
          href={`/posts/new?category=${category}`}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 mt-2"
        >
          New Post
        </Link>
        <PostCategoryTabs />
        <div className="mt-4 ">
          {postList?.isLoading && (
            <div className="flex animate-pulse">
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
          )}
          {postList?.data?.records?.map((post) => (
            <div
              key={post.id}
              className="flex items-center bg-white rounded-lg hover:shadow p-4 mb-4"
            >
              <div className="flex items-center justify-between flex-grow">
                <Link
                  href={`/posts/${post.id}/${kebabCase(
                    post.title
                  )}?category=${category}`}
                  className="flex items-center gap-8"
                >
                  {/* Upvote Icon & Count Placeholder */}
                  <div>
                    <img
                      className="inline-block size-[38px] rounded-full"
                      src={post?.user?.profilePicUrl || ""}
                      alt="Image Description"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{post.title}</h2>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <span>{post?.user?.firstName}</span>
                      <span className="mx-2">·</span>
                      <span>{post?.postComments?.length} comments</span>
                      <span className="mx-2">·</span>
                      <span>{formatDistance(post?.createdAt, new Date())}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center mt-24">
          <div className="flex items-center justify-center gap-2">
            <p>
              <select
                onChange={(event) => {
                  if (event) {
                    setPerPage(+event.target.value);
                  }
                }}
                className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </p>
            <p>per page</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {(page - 1) * perPage + 1} ~{" "}
                {(page - 1) * perPage +
                  1 +
                  (postList?.data?.records?.length || 0) -
                  1}{" "}
              </span>
              out of{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {postList?.data?.total}
              </span>{" "}
              results
            </p>
          </div>
          <div>
            <div className="inline-flex gap-x-2">
              <button
                type="button"
                onClick={() => {
                  setPage(page === 1 ? 1 : page - 1);
                }}
                disabled={page === 1 ? true : false}
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  setPage(page + 1);
                }}
                disabled={page === postList?.data?.lastPage ? true : false}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Next
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
