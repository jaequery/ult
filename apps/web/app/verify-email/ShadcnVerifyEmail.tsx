"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { useUserContext } from "../user/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Button } from "@web/components/ui/button";
import { Loader2, Mail, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function ShadcnVerifyEmail() {
  const { trpc } = useTrpc();
  const router = useRouter();
  const { setAccessToken, currentUser } = useUserContext();
  const [token] = useQueryParam("token", withDefault(StringParam, ""));

  const userJwt = trpc.userRouter.verifyAccessToken.useQuery({
    accessToken: token,
  });

  useEffect(() => {
    if (userJwt.data) {
      setAccessToken(token, userJwt.data.jwt.expiresIn);
    }
  }, [userJwt, setAccessToken, token]);

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Email Verification</CardTitle>
            <CardDescription>
              {token ? "Verifying your email address" : "Check your email"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 py-8">
            {token ? (
              <>
                {userJwt.isLoading && (
                  <>
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Please wait while we verify your email...
                    </p>
                  </>
                )}
                
                {userJwt.data && currentUser && (
                  <>
                    <CheckCircle className="h-12 w-12 text-primary" />
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">
                        Email verified successfully!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Redirecting you to the homepage...
                      </p>
                    </div>
                  </>
                )}
                
                {userJwt.error && (
                  <>
                    <XCircle className="h-12 w-12 text-destructive" />
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">
                        Verification failed
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {userJwt.error.message || "The verification link may be invalid or expired."}
                      </p>
                    </div>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="/login">Back to login</Link>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Mail className="h-12 w-12 text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">
                    Check your inbox
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification link to your email address. 
                    Please click the link to verify your account.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 w-full mt-4">
                  <Button asChild variant="outline">
                    <Link href="/login">Back to login</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}