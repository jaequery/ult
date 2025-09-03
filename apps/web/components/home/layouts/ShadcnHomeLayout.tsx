"use client";

import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Separator } from "@web/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@web/components/ui/navigation-menu";
import { cn } from "@web/lib/utils";

export default function ShadcnHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { trpc } = useTrpc();
  const { currentUser, isAuthenticating } = useUserContext();
  const categories = trpc.categoryRouter.findAll.useQuery({ parentId: 0, perPage: 100 });

  useEffect(() => {
    document.title = "Ult | The ultimate modern stack framework";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold">
                Ult
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  {categories?.data?.records?.map((category) => (
                    <NavigationMenuItem key={category.id}>
                      <Link href={`/category/${category.id}`} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {category.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center space-x-4">
              {!currentUser ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {currentUser.firstName}
                  </span>
                  {currentUser?.roles?.some((role) => role.name === "Admin") && (
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">Admin</Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/logout">Logout</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {children}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            {!currentUser ? (
              <Card>
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>
                    Join our community today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Link href="/signup" className="text-muted-foreground hover:text-foreground">
                      Register
                    </Link>
                    <Separator orientation="vertical" className="h-4" />
                    <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
                      Forgot Password
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Hello, {currentUser.firstName}!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                  {currentUser?.roles?.some((role) => role.name === "Admin") && (
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/dashboard">Admin Dashboard</Link>
                    </Button>
                  )}
                  <Button className="w-full" variant="ghost" asChild>
                    <Link href="/logout">Logout</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <Link 
                href="https://github.com/jaequery/ult" 
                target="_blank"
                className="font-medium underline underline-offset-4 hover:text-foreground"
              >
                Ult
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Copyright © Ult. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}