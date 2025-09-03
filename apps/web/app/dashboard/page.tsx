"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { Badge } from "@web/components/ui/badge";
import { Button } from "@web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@web/components/ui/table";
import { useTrpc } from "@web/contexts/TrpcContext";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";

export default function DashboardPage() {
  const { trpc } = useTrpc();
  
  const { data: usersData } = trpc.userRouter.findAll.useQuery({ perPage: 5 });
  const users = Array.isArray(usersData) 
    ? usersData.slice(0, 5) 
    : (usersData?.records || []).slice(0, 5);
  
  const { data: postsData } = trpc.postRouter.findAll.useQuery({ perPage: 5 });
  const posts = Array.isArray(postsData) 
    ? postsData.slice(0, 5) 
    : (postsData?.records || []).slice(0, 5);

  const { data: allUsersData } = trpc.userRouter.findAll.useQuery({});
  const userCount = Array.isArray(allUsersData) 
    ? allUsersData.length 
    : allUsersData?.total || 0;
  
  const { data: allPostsData } = trpc.postRouter.findAll.useQuery({});
  const postCount = Array.isArray(allPostsData) 
    ? allPostsData.length 
    : allPostsData?.total || 0;
  
  // Calculate some statistics
  const thisMonthUsers = userCount; // You can filter by date if needed
  const lastMonthUsers = Math.floor(userCount * 0.8); // Mock data
  const userGrowth = lastMonthUsers > 0 
    ? ((thisMonthUsers - lastMonthUsers) / lastMonthUsers * 100).toFixed(1)
    : "0";

  const thisMonthPosts = postCount;
  const lastMonthPosts = Math.floor(postCount * 0.7); // Mock data
  const postGrowth = lastMonthPosts > 0
    ? ((thisMonthPosts - lastMonthPosts) / lastMonthPosts * 100).toFixed(1)
    : "0";

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{userCount}</div>
              <p className="text-xs text-muted-foreground">
                +{userGrowth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{postCount}</div>
              <p className="text-xs text-muted-foreground">
                +{postGrowth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                {userCount} new users joined this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales users={users} />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  Latest posts from your platform.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/posts">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No posts yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="font-medium">
                            {post.title?.substring(0, 30)}
                            {post.title && post.title.length > 30 ? "..." : ""}
                          </div>
                        </TableCell>
                        <TableCell>
                          {post.user?.firstName} {post.user?.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {post.category?.name || "Uncategorized"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge>Published</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest activity on your platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {users.length === 0 ? (
                  <p className="text-center text-muted-foreground">No recent activity</p>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.profilePicUrl || ""} alt="Avatar" />
                        <AvatarFallback>
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge variant="secondary">New User</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}