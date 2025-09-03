"use client";

import NextAdapterApp from "next-query-params/app";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryParamProvider } from "use-query-params";
import { useUserContext } from "../user/UserContext";
import { Button } from "@web/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { cn } from "@web/lib/utils";
import { 
  Home, 
  Users, 
  FileText, 
  Tags, 
  Menu, 
  Bell, 
  Activity,
  LogOut,
  User,
  ChevronRight,
  Search,
  X
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const ShadcnDashboardLayoutFixed: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Posts", href: "/dashboard/posts", icon: FileText },
    { name: "Categories", href: "/dashboard/categories", icon: Tags },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <div className="min-h-screen bg-background">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-200 ease-in-out",
            "lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <Link href="/dashboard" className="text-xl font-bold">
              Ult
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </aside>

        {/* Main Content Area - Adjusted for sidebar */}
        <div className="lg:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-background border-b">
            <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Breadcrumb or Title (optional) */}
              <div className="flex-1 px-4 lg:px-0">
                <h1 className="text-lg font-semibold">
                  {navigation.find(item => isActive(item.href))?.name || "Dashboard"}
                </h1>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Activity className="h-5 w-5" />
                </Button>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={currentUser?.profilePicUrl || ""} alt={currentUser?.firstName || ""} />
                        <AvatarFallback>
                          {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser?.firstName} {currentUser?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/users/${currentUser?.id}`}>
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <div className="p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      <ToastContainer position="bottom-center" />
    </QueryParamProvider>
  );
};

export default ShadcnDashboardLayoutFixed;