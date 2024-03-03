"use client";

import { useUserContext } from "@web/app/user/UserContext";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";

function WithAuth<P extends {}>(
  Component: ComponentType<P>,
  allowedRoles: string[],
  failedRedirectPath = "/login"
): React.FC<P> {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { currentUser, isAuthenticating } = useUserContext();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticating) {
        // If there's no user or the user's roles don't include the required roles, redirect them.
        const isAuthorized = currentUser?.roles?.some((role) =>
          allowedRoles.includes(role.name)
        );
        if (!currentUser || !isAuthorized) {
          router.push(failedRedirectPath);
          return;
        }
      }
    }, [currentUser, isAuthenticating, router]);

    // Render a loading state or null until authentication is determined.
    if (isAuthenticating || !currentUser) {
      return <></>;
    }

    // Spread the props to the component when rendering.
    return <Component {...props} />;
  };

  return WithAuthComponent;
}

export default WithAuth;
