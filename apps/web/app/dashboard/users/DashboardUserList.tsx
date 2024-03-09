"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import DashboardUserCreateModal from "./[id]/DashboardUserCreateModal";

export default function DashboardUserList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showUserCreate, setShowUserCreate] = useState(false);
  const { trpc } = useTrpc();
  const userList = trpc.userRouter.findAll.useQuery({
    page,
    perPage,
  });
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
                      Users
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add users, edit and more.
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex gap-x-2">
                      <a
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="#"
                      >
                        Filter
                      </a>
                      <Link
                        href="#"
                        onClick={() => {
                          setShowUserCreate(true);
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
                        Add user
                      </Link>
                    </div>
                  </div>
                </div>
                {/* End Header */}
                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="ps-6 py-3 text-start">
                        <label
                          htmlFor="hs-at-with-checkboxes-main"
                          className="flex"
                        >
                          <input
                            type="checkbox"
                            className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-at-with-checkboxes-main"
                          />
                          <span className="sr-only">Checkbox</span>
                        </label>
                      </th>
                      <th
                        scope="col"
                        className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Name
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Email
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Status
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Created
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-end" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {userList?.data?.records?.map((user) => (
                      <tr key={user.id}>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 py-3">
                            <label
                              htmlFor="hs-at-with-checkboxes-1"
                              className="flex"
                            >
                              <input
                                type="checkbox"
                                className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-at-with-checkboxes-1"
                              />
                              <span className="sr-only">Checkbox</span>
                            </label>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <img
                                className="inline-block size-[38px] rounded-full"
                                src={user?.profilePicUrl || ""}
                                alt="Image Description"
                              />
                              <div className="grow">
                                <Link href={`/dashboard/users/${user.id}`}>
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 hover:underline">
                                    {user.firstName} {user.lastName}
                                  </span>
                                </Link>
                                <span className="block text-sm text-gray-500">
                                  {user.roles
                                    .map((role) => role.name)
                                    .join(", ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200"></span>
                            <span className="block text-sm text-gray-500">
                              {user.email}
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              <svg
                                className="size-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {user.status}
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">
                              {format(user.createdAt, "MMM dd, yyyy")}
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
                            <Link
                              className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href={`/dashboard/users/${user.id}`}
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
                          (userList?.data?.records?.length || 0) -
                          1}{" "}
                      </span>
                      out of{" "}
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {userList?.data?.total}
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
                          page === userList?.data?.lastPage ? true : false
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
      {showUserCreate && (
        <DashboardUserCreateModal
          onClose={() => {
            setShowUserCreate(false);
            userList.refetch();
          }}
        />
      )}
    </>
  );
}
