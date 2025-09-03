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
  Search
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const ShadcnDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
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
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            {/* Logo */}
            <div className="flex items-center space-x-4 lg:ml-0 ml-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <span className="text-xl font-bold">Ult</span>
              </Link>
            </div>

            {/* Right side actions */}
            <div className="ml-auto flex items-center space-x-4">
              {/* Search button (mobile) */}
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              {/* Activity */}
              <Button variant="ghost" size="icon">
                <Activity className="h-5 w-5" />
                <span className="sr-only">Activity</span>
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

        {/* Mobile breadcrumb */}
        <div className="sticky top-16 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:hidden">
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {navigation.find(item => isActive(item.href))?.name || "Home"}
            </span>
          </nav>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 z-50 flex w-64 flex-col lg:relative lg:inset-y-auto lg:z-0",
              "transform transition-transform duration-200 ease-in-out lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
              "lg:block"
            )}
          >
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/80 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar content */}
            <div className="relative z-50 flex h-full w-full flex-col border-r bg-card">
              <div className="flex h-16 items-center border-b px-6 lg:hidden">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <span className="text-xl font-bold">Ult</span>
                </Link>
              </div>

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

              <div className="border-t p-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      <ToastContainer position="bottom-center" />
    </QueryParamProvider>
  );
};

export default ShadcnDashboardLayout;