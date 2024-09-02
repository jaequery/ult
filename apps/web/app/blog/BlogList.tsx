"use client";

import { PostCategories } from "@server/post/post.dto";
import { useTrpc } from "@web/contexts/TrpcContext";

export default function BlogList() {
  const { trpc } = useTrpc();
  const postList = trpc.postRouter.findAll.useQuery({
    category: PostCategories.CompanyNews,
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-left justify-center px-6 py-12 lg:px-8">
        {/* Card Blog */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Title */}
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
              Blog
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              See how game-changing companies are making the most of every
              engagement with Preline.
            </p>
          </div>
          {/* End Title */}
          {/* Grid */}
          {postList?.isLoading ? (
            <div className="flex animate-pulse w-full">
              <div className="flex-shrink-0">
                <span className="size-12 block bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="ms-4 mt-2 w-full">
                <h3
                  className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"
                  style={{ width: "100%" }}
                />
                <ul className="mt-5 space-y-3">
                  <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
                  <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
                  <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
                  <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
                </ul>
              </div>
            </div>
          ) : postList?.data?.records?.length === 0 ? (
            <div className="text-center">There are no posts</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {postList?.data?.records?.map((post) => (
                <a
                  key={post.id}
                  className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href={`/blog/${post.id}`}
                >
                  {post.imageUrl && (
                    <div className="aspect-w-16 aspect-h-11">
                      <img
                        className="w-full object-cover rounded-xl"
                        src={post.imageUrl || ""}
                        alt="Image Description"
                      />
                    </div>
                  )}
                  <div className="my-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-5 text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.teaser}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-x-3">
                    <img
                      className="size-8 rounded-full"
                      src={post.user.profilePicUrl || ""}
                      alt="Image Description"
                    />
                    <div>
                      <h5 className="text-sm text-gray-800 dark:text-gray-200">
                        By {post.user.firstName} {post.user.lastName}
                      </h5>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          {/* End Grid */}
          {/* Card */}
          {/* End Card */}
        </div>
        {/* End Card Blog */}
      </div>
    </>
  );
}
