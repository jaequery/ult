"use client";

import { Roles } from "@shared/interfaces";
import { useUserContext } from "../user/UserContext";
import WithAuth from "@web/components/common/auth/WithAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Button } from "@web/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@web/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { useTrpc } from "@web/contexts/TrpcContext";
import { 
  Users, 
  FileText, 
  Tags, 
  TrendingUp,
  Activity,
  DollarSign,
  CreditCard,
  Download,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

const ShadcnDashboard = () => {
  const { currentUser } = useUserContext();
  const { trpc } = useTrpc();
  
  // Fetch data for dashboard
  const users = trpc.userRouter.findAll.useQuery({ page: 1, perPage: 5 });
  const posts = trpc.postRouter.findAll.useQuery({ page: 1, perPage: 5 });
  const categories = trpc.categoryRouter.findAll.useQuery({ parentId: 0, perPage: 10 });

  const statsCards = [
    {
      title: "Total Users",
      value: users.data?.total || 0,
      description: "+20.1% from last month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Total Posts",
      value: posts.data?.total || 0,
      description: "+180 from last month",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Categories",
      value: categories.data?.total || 0,
      description: "+19% from last month",
      icon: Tags,
      trend: "up"
    },
    {
      title: "Active Now",
      value: "573",
      description: "+201 since last hour",
      icon: Activity,
      trend: "up"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser?.firstName}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Posts */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Latest posts from your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.data?.records?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      <Link 
                        href={`/posts/${post.id}`}
                        className="hover:underline"
                      >
                        {post.title?.substring(0, 30)}...
                      </Link>
                    </TableCell>
                    <TableCell>{post.user?.firstName || "Unknown"}</TableCell>
                    <TableCell>{post.category?.name || "Uncategorized"}</TableCell>
                    <TableCell>
                      {post.createdAt ? format(new Date(post.createdAt), "MMM d") : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">{post.commentCount || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              New users who joined recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {users.data?.records?.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profilePicUrl || ""} alt={user.firstName || ""} />
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
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/posts">
                <FileText className="mr-2 h-4 w-4" />
                View All Posts
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/categories">
                <Tags className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Post
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current system status and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">API Server</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Database</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Cache</span>
                </div>
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-sm">CDN</span>
                </div>
                <span className="text-sm text-muted-foreground">Minor delays</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>
              Overview of platform usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">User Engagement</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Content Creation</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm text-muted-foreground">43%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "43%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WithAuth(ShadcnDashboard, [Roles.Admin, Roles.User]);