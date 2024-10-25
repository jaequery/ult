"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { differenceInDays, format } from "date-fns";
import kebabCase from "lodash/kebabCase";
import Link from "next/link";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import { useUserContext } from "../user/UserContext";
import { getUsername } from "@server/post/post.dto";

export default function PostFeed(params: {
  categoryId?: number;
  page?: number;
  perPage?: number;
  showPagination?: boolean;
  search?: string;
}) {
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const [categoryId, setCategoryId] = useQueryParam(
    "categoryId",
    withDefault(NumberParam, params.categoryId ?? 0)
  );
  const [page, setPage] = useQueryParam(
    "page",
    withDefault(NumberParam, params.page ?? 1)
  );
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, params.perPage ?? 10)
  );
  const [showPagination, setShowPagination] = useQueryParam(
    "showPagination",
    withDefault(BooleanParam, params.showPagination ?? false)
  );
  const [search, setSearch] = useQueryParam(
    "search",
    withDefault(StringParam, params.search)
  );

  const postList = trpc.postRouter.findAll.useQuery({
    page,
    perPage,
    categoryId,
    search,
  });

  const category = trpc.categoryRouter.findById.useQuery({
    id: categoryId,
  });

  const getWriteUrl = () => {
    if (
      category?.data?.singlePostOnly &&
      postList?.data?.records?.length &&
      postList?.data?.records?.length > 0
    ) {
      return `/posts/${postList?.data?.records[0]?.id}/edit?categoryId=${categoryId}`;
    }
    return `/posts/new?categoryId=${categoryId}`;
  };
  return (
    <>
      <div className="flex items-center justify-between pb-2 border-b border-orange-200">
        <h3 className=" text-lg">타운 뉴스 🍀</h3>

        {params.showPagination &&
          (!category?.data?.adminWriteOnly ||
            (category?.data?.adminWriteOnly &&
              currentUser?.roles?.some((r) => r.name === "Admin"))) && (
            <Link
              href={getWriteUrl()}
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
              글쓰기
            </Link>
          )}
      </div>
      <div className=" rounded-xl  py-4">
        {postList?.data?.records &&
        postList?.data?.records?.length > 0 &&
        category?.data?.singlePostOnly ? (
          <>
            <div
              className="text-sm text-gray-800 whitespace-pre-line text-left"
              dangerouslySetInnerHTML={{
                __html: postList?.data?.records[0]?.description || "",
              }}
            />
          </>
        ) : (
          <>
            <div className="">
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
              {postList?.data?.records.length === 0 && (
                <div className="flex text-center text-gray-500 justify-center items-center bg-white rounded-lg p-4">
                  게시물이 없습니다
                </div>
              )}
              <div className="flex flex-col gap-2">
                {postList?.data?.records?.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center bg-white  border-gray-200 pb-4"
                  >
                    <div className="flex items-start justify-between flex-grow gap-3">
                      <Link
                        href={`/posts/${post.id}/${kebabCase(
                          post.title
                        )}?categoryId=${categoryId}`}
                        className="flex items-center "
                      >
                        <div>
                          <h3 className="text-sm mb-2 text-red-500">
                            [{post?.category?.name}]
                          </h3>
                          <h2 className="flex gap-2 text-lg hover:text-orange-900 hover:underline">
                            {/* <div className="flex-shrink-0">
                          <img
                            className="size-6 rounded-full"
                            src={post?.user?.profilePicUrl || ""}
                            alt="Image Description"
                          />
                        </div> */}{" "}
                            {post.title}{" "}
                            {differenceInDays(
                              new Date(),
                              new Date(post.createdAt)
                            ) <= 3 && "✨"}
                          </h2>
                          <div className="items-center text-sm text-gray-500 mt-2 flex">
                            <span>{getUsername(post?.user)}</span>
                            <span className="mx-2">·</span>
                            <span>{post?.viewCount} views</span>
                            <span className="mx-2">·</span>
                            <span>{post?.postComments?.length} comments</span>
                            <span className="mx-2">·</span>
                            <span>{format(post.createdAt, "MM-dd-yyyy")}</span>
                          </div>
                        </div>
                      </Link>
                      {post?.imageUrl && (
                        <Link
                          href={`/posts/${post.id}/${kebabCase(
                            post.title
                          )}?categoryId=${categoryId}`}
                          className="flex justify-center items-center overflow-hidden rounded-md w-32 h-32" // Added fixed width and height
                        >
                          <div className="transition-transform duration-300 hover:scale-110 w-full h-full flex items-center justify-center">
                            {" "}
                            {/* Added full width/height and flex properties */}
                            <img
                              className="rounded-md max-w-full max-h-full object-contain" // Removed m-auto, added max-width/height
                              src={post?.imageUrl}
                              alt={post.title} // Added alt text for accessibility
                            />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {showPagination && (
              <div className="py-4 gap-3 flex justify-between items-center mt-24">
                <div className="flex items-center justify-center gap-2">
                  <p>
                    <select
                      onChange={(event) => {
                        if (event) {
                          setPerPage?.(+event.target.value);
                        }
                      }}
                      className="py-2 pe-9 block w-full border-gray-200  text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    >
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {/* {postList?.data && (
                <>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {(page - 1) * perPage + 1} ~{" "}
                    {(page - 1) * perPage +
                      1 +
                      (postList?.data?.records?.length || 0) -
                      1}{" "}
                  </span>{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ({postList?.data?.total || 0} 전채)
                  </span>{" "}
                </>
              )} */}
                  </p>
                </div>
                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPage?.(page === 1 ? 1 : page - 1);
                      }}
                      disabled={page === 1 || !postList?.data ? true : false}
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
                        setPage?.(page + 1);
                      }}
                      disabled={
                        page === postList?.data?.lastPage ||
                        !postList?.data ||
                        (postList?.data && postList?.data?.records.length === 0)
                          ? true
                          : false
                      }
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
            )}
          </>
        )}
      </div>
    </>
  );
}
