"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import DashboardCategoryCreateModal from "./[id]/DashboardCategoryCreateModal";

export default function DashboardCategoryList() {
  const { trpc } = useTrpc();
  // pagination
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, 10)
  );
  // create category
  const [showCategoryCreate, setShowCategoryCreate] = useState(false);
  // get categories
  const categoryList = trpc.categoryRouter.findAll.useQuery({
    page,
    perPage,
  });
  // remove category
  const categoryRemove = trpc.categoryRouter.remove.useMutation();
  // bulk delete functionality
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleCategorieselection = (categoryId: number) => {
    setSelectedIds((prevSelectedIds: number[]) =>
      prevSelectedIds.includes(categoryId)
        ? prevSelectedIds.filter((id: number) => id !== categoryId)
        : [...prevSelectedIds, categoryId]
    );
  };

  return (
    <>
      {/* Table Section */}
      <div className="">
        {/* Card */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="bg-white  border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Categories
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add categories, edit and more.
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex gap-x-2">
                      {selectedIds?.length > 0 && (
                        <a
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                          onClick={async () => {
                            const c = confirm(
                              "Are you sure you want to remove them?"
                            );
                            if (c && selectedIds) {
                              await categoryRemove.mutateAsync({
                                id: selectedIds,
                              });
                              setSelectedIds([]);
                              toast("Removed");
                              categoryList.refetch();
                            }
                          }}
                        >
                          Remove
                        </a>
                      )}
                      <Link
                        href="#"
                        onClick={() => {
                          setShowCategoryCreate(true);
                        }}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-hs-overlay="#hs-static-backdrop-modal"
                      >
                        <svg
                          className="flex-shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                        Add category
                      </Link>
                    </div>
                  </div>
                </div>
                {/* End Header */}
                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="w-[5%] ps-6 py-3 text-start px-4">
                        <label
                          htmlFor="hs-at-with-checkboxes-main"
                          className="flex"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedIds.length ===
                              categoryList?.data?.records?.length
                            }
                            onChange={(event: any) => {
                              if (categoryList?.data) {
                                if (event.target.checked) {
                                  // Select all category IDs
                                  setSelectedIds(
                                    categoryList?.data?.records?.map(
                                      (category) => category.id
                                    )
                                  );
                                } else {
                                  // Clear selection
                                  setSelectedIds([]);
                                }
                              }
                            }}
                            className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-at-with-checkboxes-main"
                          />
                          <span className="sr-only">Checkbox</span>
                        </label>
                      </th>
                      <th
                        scope="col"
                        className="w-[50%] ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Category
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="w-[10%] px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Sort Order
                          </span>
                        </div>
                      </th>
                      {/* <th scope="col" className="w-[10%] px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            # of posts
                          </span>
                        </div>
                      </th> */}
                      <th scope="col" className="w-[10%] px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Write Access
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="w-[10%] px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Created
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="w-[5%] px-6 py-3 text-end" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {categoryList?.data?.records?.map((category) => (
                      <tr key={category.id}>
                        <td className="w-[5%] whitespace-nowrap">
                          <div className="ps-6 py-3">
                            <label
                              htmlFor="hs-at-with-checkboxes-1"
                              className="flex"
                            >
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(category.id)}
                                onChange={() =>
                                  toggleCategorieselection(category.id)
                                }
                                className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              />
                              <span className="sr-only">Checkbox</span>
                            </label>
                          </div>
                        </td>
                        <td className="w-[50%] whitespace-nowrap">
                          <div className="py-3 ps-6">
                            <span className="text-sm">{category.name}</span>
                          </div>
                        </td>
                        <td className="w-[10%] whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">
                              {category.sortOrder}
                            </span>
                          </div>
                        </td>
                        {/* <td className="w-[10%] whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">-</span>
                          </div>
                        </td> */}
                        <td className="w-[10%] whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">
                              {category.adminWriteOnly ? "Admin" : "Everyone"}
                            </span>
                          </div>
                        </td>
                        <td className="w-[10%] whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">
                              {format(category.createdAt, "MMM dd, yyyy")}
                            </span>
                          </div>
                        </td>
                        <td className="w-[5%] whitespace-nowrap">
                          <div className="px-6 py-1.5 gap-4 flex">
                            <Link
                              className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href={`/dashboard/categories/${category.id}`}
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* End Table */}
                {/* Footer */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
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
                          (categoryList?.data?.records?.length || 0) -
                          1}{" "}
                      </span>
                      out of{" "}
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {categoryList?.data?.total}
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
                        disabled={
                          page === categoryList?.data?.lastPage ? true : false
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
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
      {showCategoryCreate && (
        <DashboardCategoryCreateModal
          onClose={() => {
            setShowCategoryCreate(false);
            categoryList.refetch();
          }}
        />
      )}
    </>
  );
}
