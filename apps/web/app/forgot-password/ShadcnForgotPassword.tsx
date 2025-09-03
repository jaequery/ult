"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginDtoType, UserResetPasswordDto } from "@server/user/user.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ShadcnForgotPassword() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLoginDtoType>({
    resolver: zodResolver(UserResetPasswordDto),
  });
  const resetPassword = trpc.userRouter.resetPassword.useMutation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Reset password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resetPassword.data ? (
              <div className="flex flex-col items-center space-y-4 py-4">
                <CheckCircle className="h-12 w-12 text-primary" />
                <p className="text-center text-sm text-muted-foreground">
                  We've sent a password reset link to your email address. 
                  Please check your inbox and follow the instructions.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Back to login</Link>
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(async (data) => {
                  try {
                    resetPassword.mutate(data);
                  } catch (e) {}
                })}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={resetPassword.isLoading}
                >
                  {resetPassword.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            )}
            
            {resetPassword.error && (
              <p className="mt-4 text-sm text-destructive text-center">
                {resetPassword.error.message}
              </p>
            )}
          </CardContent>
          {!resetPassword.data && (
            <CardFooter>
              <div className="text-center text-sm text-muted-foreground w-full">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="hover:text-foreground underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}