"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

export default function PostCategoryTabs() {
  const { trpc } = useTrpc();
  const router = useRouter();
  const [category, setCategory] = useQueryParam(
    "category",
    withDefault(StringParam, "All")
  );
  const categories = trpc.postRouter.getCategories.useQuery();
  return (
    <>
      <nav className="flex space-x-6 mt-12">
        {categories?.data?.map((postCategory, i) => (
          <a
            key={i}
            className={
              postCategory.category === category
                ? `py-2 px-1 inline-flex items-center gap-2 border border-blue-500 rounded-xl px-6 text-sm font-medium whitespace-nowrap text-blue-600 focus:outline-none focus:text-blue-800`
                : `py-2 px-1 inline-flex items-center gap-2 border border-gray-400 rounded-xl px-6 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600`
            }
            href="#"
            aria-current="page"
            onClick={() => {
              router.push(`/posts/?category=${postCategory.category}`);
            }}
          >
            {postCategory.category || "All"}{" "}
            <span className="ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-white">
              {postCategory._count.category}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
