"use client";

import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "../Header";
import MainMenu from "../menus/MainMenu";
import WeatherWidget from "../WeatherWidget";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { trpc } = useTrpc();
  const { currentUser, isAuthenticating } = useUserContext();
  const categories = trpc.categoryRouter.findAll.useQuery({ parentId: 0, perPage: 100 });

  useEffect(() => {
    document.title =
      "Ult | The ultimate modern stack framework";
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <Header />
        <MainMenu
          categories={
            categories?.data?.records?.map((record) => ({
              ...record,
              id: record.id,
            })) || []
          }
        />
        <div className="flex flex-col lg:flex-row mt-0 lg:mt-8 gap-8 sm:gap-12">
          {/* Left sidebar */}
          <aside style={{ width: 400 }}>
            <div
              className="p-6 rounded-xl mb-4 flex-col items-center hidden lg:block"
              style={{
                border: "1px solid #ececec",
                textAlign: "center",
              }}
            >
              <WeatherWidget />
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:w-[1200px] px-2">{children}</div>

          {/* Right sidebar */}
          <aside className="lg:w-96 hidden lg:block">
            {!currentUser && (
              <div
                className="w-full rounded-xl text-center mb-4 py-6"
                style={{
                  border: "1px solid #ececec",
                }}
              >
                <div className="w-full px-8">
                  <Link
                    href="/login"
                    className="px-8 justify-center py-3 text-white font-bold rounded-lg bg-green-500 hover:opacity-90 flex"
                    style={{
                      backgroundColor: "#03C75B",
                    }}
                  >
                    Login
                  </Link>
                </div>
                <div className="w-full flex justify-evenly items-center">
                  <ul className="list-none flex gap-3 mt-2">
                    <li>
                      <Link
                        href="/signup"
                        className="text-sm text-gray-600 hover:text-gray-600"
                      >
                        Register
                      </Link>
                    </li>
                    <li className="text-gray-400">|</li>
                    <li>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-gray-600 hover:text-gray-600"
                      >
                        Forgot Pass
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {currentUser && (
              <div
                className="w-full rounded-xl text-center mb-4 py-6 bg-yellow-50"
                style={{
                  border: "1px solid #ececec",
                }}
              >
                <div className="w-full px-8">
                  <div className="mb-4">
                    Hello, {currentUser?.firstName}!
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      className="text-md leading-6 px-4 py-2 rounded-md bg-green-500 text-white"
                    >
                      Edit Profile
                    </Link>
                    {currentUser?.roles?.some(
                      (role) => role.name === "Admin"
                    ) && (
                      <Link
                        href="/dashboard"
                        className="text-md leading-6 px-4 py-2 rounded-md text-green-500 border border-green-500"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/logout"
                      className="text-md leading-6 text-orange-400 hover:text-orange-600 hover:text-bold"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <footer className="border-t border-gray-300 bg-gray-100 py-4 mt-12 lg:mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center mb-4">
            <div className="flex items-center  mb-4 md:mb-0">
              <h2 className="text-sm text-gray-600 text-center">
                Powered by <Link href='https://github.com/jaequery/ult' target='_blank'>Ult</Link>
              </h2>
            </div>
          </div>
          <div className="text-sm text-gray-600 text-center">
            Copyright © Ult. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
