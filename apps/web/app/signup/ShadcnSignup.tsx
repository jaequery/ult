"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateDtoType, UserSignupDto } from "@server/user/user.dto";
import { useTrpc } from "@web/contexts/TrpcContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { useUserContext } from "../user/UserContext";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { Separator } from "@web/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function ShadcnSignup() {
  const router = useRouter();
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const { setAccessToken } = useUserContext();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = useForm<UserCreateDtoType>({
    resolver: zodResolver(UserSignupDto),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const userSignup = trpc.userRouter.signup.useMutation();
  
  useEffect(() => {
    if (userSignup?.data?.user) {
      router.push(`/verify-email`);
    }
  }, [userSignup, router]);
  
  useEffect(() => {
    if (currentUser) {
      router.push(`/dashboard`);
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign Up */}
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 mr-2">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                Sign up with Google
              </a>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form
              onSubmit={handleSubmit(async (data) => {
                await userSignup.mutateAsync(data);
              })}
              className="space-y-4"
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
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={userSignup.isLoading}
              >
                {userSignup.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            {userSignup.error && (
              <p className="text-sm text-destructive text-center">
                {userSignup.error.message}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link
                href="/login"
                className="hover:text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}