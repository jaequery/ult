"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdateDto, UserUpdateDtoType } from "@server/user/user.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { useUserContext } from "../user/UserContext";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ShadcnProfile() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const { setAccessToken } = useUserContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<UserUpdateDtoType>({
    resolver: zodResolver(UserUpdateDto),
    defaultValues: {
      id: currentUser?.id || 0,
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      username:
        currentUser?.username ||
        `${currentUser?.firstName} ${currentUser?.lastName}`,
      phone: currentUser?.phone || "",
    },
  });
  const userUpdate = trpc.userRouter.update.useMutation();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(async (data) => {
                  const res = await userUpdate.mutateAsync(data);
                  if (res) {
                    alert("Profile updated");
                    window.location.href = "/";
                  }
                })}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    country="US"
                    value={getValues("phone")}
                    onChange={(value) => setValue("phone", value || "")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={userUpdate.isLoading}
                  >
                    {userUpdate.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>

              {userUpdate.error && (
                <p className="mt-4 text-sm text-destructive">
                  {userUpdate.error.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}