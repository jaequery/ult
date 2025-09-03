"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";

interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profilePicUrl?: string | null;
}

interface RecentSalesProps {
  users: User[];
}

export function RecentSales({ users }: RecentSalesProps) {
  // Generate mock revenue for each user
  const usersWithRevenue = users.map((user) => ({
    ...user,
    revenue: Math.floor(Math.random() * 5000) + 100,
  }));

  if (users.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-muted-foreground">No recent users</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {usersWithRevenue.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profilePicUrl || ""} alt="Avatar" />
            <AvatarFallback>
              {user.firstName?.[0]?.toUpperCase()}
              {user.lastName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">+${user.revenue.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}